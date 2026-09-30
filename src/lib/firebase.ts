import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyBNzzivjGB1VJv1WM0sMukp1rH6YaZG0Qg",
  authDomain: "tedxporpsyouth.firebaseapp.com",
  projectId: "tedxporpsyouth",
  storageBucket: "tedxporpsyouth.firebasestorage.app",
  messagingSenderId: "1093825987101",
  appId: "1:1093825987101:web:21a4701c7629133c647cf4",
  measurementId: "G-GSDNVPW9C7"
};

// Initialize Firebase (safely reuse if already initialized for SSR/HMR)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
