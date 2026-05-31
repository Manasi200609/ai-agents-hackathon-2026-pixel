import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    language: 'mr',
    gender: '',
    village: '',
    role: 'patient',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!user?.uid) return;

      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          setProfile({
            name: data.name || user.displayName || '',
            email: data.email || user.email || '',
            language: data.language || 'mr',
            gender: data.gender || '',
            village: data.village || '',
            role: data.role || 'patient',
          });
        } else {
          setProfile((prev) => ({
            ...prev,
            name: user.displayName || '',
            email: user.email || '',
          }));
        }
      } catch (err) {
        console.error('Profile load failed:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  function updateField(field, value) {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function saveProfile() {
    if (!user?.uid) return;

    setSaving(true);

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          ...profile,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      alert('Profile saved');
    } catch (err) {
      console.error('Profile save failed:', err);
      alert('Profile save failed');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="screen profile-screen">
        <div className="empty-state">
          <p className="empty-title">प्रोफाइल लोड होत आहे...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen profile-screen">
      <div className="screen-header">
        <h2 className="screen-title">माझी माहिती</h2>
        <p className="screen-sub">तुमची आरोग्य प्रोफाइल माहिती</p>
      </div>

      <div className="profile-avatar-wrap">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="profile-photo"
          />
        ) : (
          <div className="profile-avatar">
            {profile.name?.charAt(0)?.toUpperCase() || 'व'}
          </div>
        )}
      </div>

      <div className="profile-section">
        <label className="profile-label">नाव</label>
        <input
          className="profile-input"
          value={profile.name}
          onChange={(e) => updateField('name', e.target.value)}
        />
      </div>

      <div className="profile-section">
        <label className="profile-label">ईमेल</label>
        <input
          className="profile-input"
          value={profile.email}
          disabled
        />
      </div>

      <div className="profile-section">
        <label className="profile-label">गाव / परिसर</label>
        <input
          className="profile-input"
          value={profile.village}
          onChange={(e) => updateField('village', e.target.value)}
        />
      </div>

      <button className="save-btn" onClick={saveProfile} disabled={saving}>
        {saving ? 'Saving...' : 'Save Profile'}
      </button>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}