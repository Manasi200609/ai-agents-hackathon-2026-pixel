import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCbhR_LmlYwheE7dINmQ52pW1RvW8HIS0Y',
  authDomain: 'vaidya-8c6c5.firebaseapp.com',
  projectId: 'vaidya-8c6c5',
  storageBucket: 'vaidya-8c6c5.firebasestorage.app',
  messagingSenderId: '944069701976',
  appId: '1:944069701976:web:6047ca578b97e1240fb52d',
  measurementId: 'G-XCYJCCT7RT',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);