import { db, storage } from '@/lib/firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { BookingData, PaymentSettings } from '@/types/booking';
import { compressImage } from '@/lib/imageCompressor';

export const DEFAULT_UPI_ID = '7842906633@superyes';

const BOOKINGS_COLLECTION = 'bookings';
const SETTINGS_COLLECTION = 'settings';
const PAYMENT_SETTINGS_DOC = 'paymentQR';
const LOCAL_STORAGE_KEY = 'tedx_bookings';

/**
 * Fetch global payment settings (UPI ID & Custom QR URL)
 */
export async function getPaymentSettings(): Promise<PaymentSettings> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, PAYMENT_SETTINGS_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as PaymentSettings;
      return {
        upiId: data.upiId || DEFAULT_UPI_ID,
        customQrUrl: data.customQrUrl || '',
        updatedAt: data.updatedAt,
      };
    }
  } catch (err) {
    console.warn('Could not fetch remote payment settings, using defaults:', err);
  }
  return {
    upiId: DEFAULT_UPI_ID,
    customQrUrl: '',
  };
}

/**
 * Update global payment settings in Firestore
 */
export async function updatePaymentSettings(settings: Partial<PaymentSettings>): Promise<void> {
  const docRef = doc(db, SETTINGS_COLLECTION, PAYMENT_SETTINGS_DOC);
  await setDoc(docRef, {
    ...settings,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

/**
 * Upload a custom QR image (by admin)
 * Resizes and uploads to Firebase Storage, saves URL in settings
 */
export async function uploadCustomQrImage(file: File): Promise<string> {
  const { blob, dataUrl } = await compressImage(file, 1000, 0.85);

  try {
    const storageRef = ref(storage, `settings/custom-qr-${Date.now()}.jpg`);
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
    });
    const downloadUrl = await getDownloadURL(snapshot.ref);
    await updatePaymentSettings({ customQrUrl: downloadUrl });
    return downloadUrl;
  } catch (err) {
    console.warn('Storage upload failed, storing data URL fallback:', err);
    // If storage is blocked by security rules, store the compressed base64 in Firestore settings
    await updatePaymentSettings({ customQrUrl: dataUrl });
    return dataUrl;
  }
}

/**
 * Upload payment screenshot for a booking
 * Returns the download URL or compressed fallback
 */
export async function uploadPaymentScreenshot(
  bookingId: string,
  file: File
): Promise<{ url: string; dataUrl: string }> {
  const { blob, dataUrl } = await compressImage(file, 1200, 0.75);

  try {
    const storageRef = ref(storage, `payment-screenshots/${bookingId}.jpg`);
    const snapshot = await uploadBytes(storageRef, blob, {
      contentType: 'image/jpeg',
    });
    const url = await getDownloadURL(snapshot.ref);
    return { url, dataUrl };
  } catch (err) {
    console.warn('Firebase Storage upload failed (falling back to base64 for Spark free tier):', err);
    return { url: '', dataUrl };
  }
}

/**
 * Save new booking to Firestore and backup to localStorage
 */
export async function createBooking(data: BookingData): Promise<BookingData> {
  const bookingToSave = {
    ...data,
    createdAt: serverTimestamp(),
  };

  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, data.bookingId);
    await setDoc(docRef, bookingToSave);
  } catch (err) {
    console.error('Failed to save to Firestore, saving locally:', err);
  }

  // Backup to localStorage
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    local.unshift(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local));
  } catch {
    // Ignore storage errors
  }

  return data;
}

/**
 * Fetch all bookings from Firestore (with localStorage fallback/merge)
 */
export async function getBookings(): Promise<BookingData[]> {
  const bookingsMap = new Map<string, BookingData>();

  // 1. Fetch from Firestore
  try {
    const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const b = d.data() as BookingData;
      bookingsMap.set(b.bookingId || d.id, { ...b, id: d.id });
    });
  } catch (err) {
    console.warn('Firestore fetch failed or offline, loading localStorage:', err);
  }

  // 2. Merge with localStorage items
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') as BookingData[];
    local.forEach((b) => {
      if (!bookingsMap.has(b.bookingId)) {
        bookingsMap.set(b.bookingId, b);
      }
    });
  } catch {
    // Ignore storage errors
  }

  return Array.from(bookingsMap.values());
}

/**
 * Update booking fields (e.g. approve payment, check in, reject)
 */
export async function updateBooking(
  bookingId: string,
  updates: Partial<BookingData>
): Promise<void> {
  // Update Firestore
  try {
    const docRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn('Firestore update failed, updating local copy only:', err);
  }

  // Update localStorage
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]') as BookingData[];
    const updated = local.map((b) => (b.bookingId === bookingId ? { ...b, ...updates } : b));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}
