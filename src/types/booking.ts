export type TicketTier = 'student' | 'faculty' | 'general';
export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'free';
export type BookingStatus = 'confirmed' | 'checked-in' | 'cancelled' | 'pending_verification';

export interface BookingData {
  id?: string;
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rollNumber?: string;
  grade: string;
  section?: string;
  parentName?: string;
  parentPhone?: string;
  ticketTier: TicketTier;
  quantity: number;
  totalPrice: number;
  dietaryPreference: string;
  timestamp: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentUpiId?: string;
  transactionId?: string;
  screenshotUrl?: string;
  screenshotFallback?: string; // Base64 fallback if storage bucket rules block client
  rejectionReason?: string;
  verifiedAt?: string;
  verifiedBy?: string;
}

export interface PaymentSettings {
  upiId: string;
  customQrUrl?: string;
  updatedAt?: string;
}
