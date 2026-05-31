import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase';

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function loginWithGoogle() {
    try {
      setError('');
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Google login failed:', err);
      setError('Google login failed. Please try again.');
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return {
    user,
    authLoading,
    error,
    loginWithGoogle,
    logout,
  };
}