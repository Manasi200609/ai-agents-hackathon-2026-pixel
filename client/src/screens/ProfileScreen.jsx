import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase';

const LANGUAGES = [
  { code: 'mr', label: 'मराठी' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'en', label: 'English' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'as', label: 'অসমীয়া' },
  { code: 'ks', label: 'کٲشُر' },
];

const TEXT = {
  mr: {
    title: 'माझी माहिती',
    sub: 'तुमची आरोग्य प्रोफाइल माहिती',
    loading: 'प्रोफाइल लोड होत आहे...',
    name: 'नाव',
    email: 'ईमेल',
    language: 'भाषा',
    village: 'गाव / परिसर',
    save: 'प्रोफाइल सेव्ह करा',
    saving: 'सेव्ह होत आहे...',
    logout: 'लॉगआउट',
    saved: 'प्रोफाइल सेव्ह झाले',
    failed: 'प्रोफाइल सेव्ह झाले नाही',
  },
  hi: {
    title: 'मेरी जानकारी',
    sub: 'आपकी स्वास्थ्य प्रोफाइल जानकारी',
    loading: 'प्रोफाइल लोड हो रही है...',
    name: 'नाम',
    email: 'ईमेल',
    language: 'भाषा',
    village: 'गाँव / क्षेत्र',
    save: 'प्रोफाइल सेव करें',
    saving: 'सेव हो रहा है...',
    logout: 'लॉगआउट',
    saved: 'प्रोफाइल सेव हो गई',
    failed: 'प्रोफाइल सेव नहीं हुई',
  },
  en: {
    title: 'My Profile',
    sub: 'Your health profile information',
    loading: 'Loading profile...',
    name: 'Name',
    email: 'Email',
    language: 'Language',
    village: 'Village / Area',
    save: 'Save Profile',
    saving: 'Saving...',
    logout: 'Logout',
    saved: 'Profile saved',
    failed: 'Profile save failed',
  },
};

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { changeLanguage } = useLanguage();

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

  const t = TEXT[profile.language] || TEXT.en;

  useEffect(() => {
    async function loadProfile() {
      if (!user?.uid) return;

      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          const savedLang = data.language || 'mr';

          setProfile({
            name: data.name || user.displayName || '',
            email: data.email || user.email || '',
            language: savedLang,
            gender: data.gender || '',
            village: data.village || '',
            role: data.role || 'patient',
          });

          if (changeLanguage) {
            changeLanguage(savedLang);
          }
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

    if (field === 'language' && changeLanguage) {
      changeLanguage(value);
    }
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

      alert(t.saved);
    } catch (err) {
      console.error('Profile save failed:', err);
      alert(t.failed);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="screen profile-screen">
        <div className="empty-state">
          <p className="empty-title">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen profile-screen">
      <div className="screen-header">
        <h2 className="screen-title">{t.title}</h2>
        <p className="screen-sub">{t.sub}</p>
      </div>

      <div className="profile-avatar-wrap">
        <div className="profile-avatar-wrap">
  <div className="profile-avatar">
    {profile.name?.charAt(0)?.toUpperCase() || 'व'}
  </div>
</div>
      </div>

      <div className="profile-section">
        <label className="profile-label">{t.name}</label>
        <input
          className="profile-input"
          value={profile.name}
          onChange={(e) => updateField('name', e.target.value)}
        />
      </div>

      <div className="profile-section">
        <label className="profile-label">{t.email}</label>
        <input
          className="profile-input"
          value={profile.email}
          disabled
        />
      </div>

      <div className="profile-section">
        <label className="profile-label">{t.language}</label>
        <select
          className="profile-input"
          value={profile.language}
          onChange={(e) => updateField('language', e.target.value)}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="profile-section">
        <label className="profile-label">{t.village}</label>
        <input
          className="profile-input"
          value={profile.village}
          onChange={(e) => updateField('village', e.target.value)}
        />
      </div>

      <button className="save-btn" onClick={saveProfile} disabled={saving}>
        {saving ? t.saving : t.save}
      </button>

      <button className="logout-btn" onClick={logout}>
        {t.logout}
      </button>
    </div>
  );
}