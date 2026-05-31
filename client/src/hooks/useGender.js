import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './useAuth';

export function useGender() {
  const { user } = useAuth();
  const [gender, setGender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGender = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setGender(userDoc.data().gender || null);
        }
      } catch (err) {
        console.error('Error fetching gender:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGender();
  }, [user]);

  return { gender, loading };
}
