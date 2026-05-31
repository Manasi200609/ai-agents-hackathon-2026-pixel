import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const GENDERS = [
  { id: 'male', label: 'पुरुष' },
  { id: 'female', label: 'स्त्री' },
  { id: 'other', label: 'इतर' },
  { id: 'prefer_not', label: 'सांगायचे नाही' },
];

const LANGUAGES = [
  { code: 'mr', name: 'मराठी' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'en', name: 'English' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'as', name: 'অসমীয়া' },
  { code: 'ks', name: 'کٲشُر' },
];

export default function AuthScreen() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { user, loginWithGoogle, error } = useAuth();

  const [authStep, setAuthStep] = useState('login');
  const [role, setRole] = useState('patient');

  const [name, setName] = useState('');
  const [language, setLanguage] = useState('mr');
  const [gender, setGender] = useState('');
  const [village, setVillage] = useState('');
  const [ashaId, setAshaId] = useState('');

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    async function checkProfile() {
      if (!user) return;

      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().profileComplete) {
          const data = userSnap.data();

          i18n.changeLanguage(data.language || 'mr');

          if (data.role === 'asha') {
            navigate('/asha-dashboard');
          } else {
            navigate('/home');
          }
        } else {
          setName(user.displayName || '');
          setAuthStep('profile');
        }
      } catch (err) {
        console.error('Profile check failed:', err);
        setAuthStep('profile');
      }
    }

    checkProfile();
  }, [user]);

  function handleLanguageChange(langCode) {
    setLanguage(langCode);
    i18n.changeLanguage(langCode);
  }

  async function handleProfileSubmit() {
    if (!name.trim() || !gender || !language || !village.trim()) {
      setProfileError('कृपया सर्व आवश्यक माहिती भरा.');
      return;
    }

    if (!user) {
      setProfileError('User not authenticated.');
      return;
    }

    setProfileLoading(true);
    setProfileError('');

    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          name: name.trim(),
          email: user.email || '',
          photoURL: user.photoURL || '',
          gender,
          language,
          village: village.trim(),
          role,
          ashaId: role === 'asha' ? ashaId.trim() : null,
          profileComplete: true,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
        { merge: true }
      );

      i18n.changeLanguage(language);

      if (role === 'asha') {
        navigate('/asha-dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Profile save failed:', err);
      setProfileError('Profile save failed. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-logo">
        <div className="auth-logo-icon">व</div>
        <h1 className="auth-logo-name">वैद्या</h1>
        <p className="auth-logo-tagline">तुमची ग्रामीण आरोग्य साथी</p>
      </div>

      <div className="auth-card">
        {authStep === 'login' && (
          <>
            <h2 className="auth-title">स्वागत आहे</h2>
            <p className="auth-sub">
              आरोग्य संवाद, इतिहास आणि भाषा प्राधान्य जतन करण्यासाठी लॉगिन करा.
            </p>

            {error && <p className="auth-error">{error}</p>}

            <button className="auth-btn" onClick={loginWithGoogle}>
              Google ने सुरू करा
            </button>
          </>
        )}

        {authStep === 'profile' && user && (
          <div className="profile-form">
            <h2 className="auth-title">प्रोफाइल पूर्ण करा</h2>

            <div className="role-toggle">
              <button
                type="button"
                className={role === 'patient' ? 'active' : ''}
                onClick={() => setRole('patient')}
              >
                Patient
              </button>

              <button
                type="button"
                className={role === 'asha' ? 'active' : ''}
                onClick={() => setRole('asha')}
              >
                ASHA Worker
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Language</label>

              <div className="language-grid">
                {LANGUAGES.map((lang) => (
                  <button
                    type="button"
                    key={lang.code}
                    className={`language-btn ${
                      language === lang.code ? 'active selected' : ''
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>

              <div className="gender-grid">
                {GENDERS.map((g) => (
                  <button
                    type="button"
                    key={g.id}
                    className={`gender-btn ${gender === g.id ? 'active' : ''}`}
                    onClick={() => setGender(g.id)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Village / Area</label>
              <input
                className="form-input"
                value={village}
                placeholder="Enter village or area"
                onChange={(e) => setVillage(e.target.value)}
              />
            </div>

            {role === 'asha' && (
              <div className="form-group">
                <label className="form-label">ASHA Worker ID</label>
                <input
                  className="form-input"
                  value={ashaId}
                  placeholder="Enter ASHA ID"
                  onChange={(e) => setAshaId(e.target.value)}
                />
              </div>
            )}

            {profileError && <p className="auth-error">{profileError}</p>}

            <button
              className="auth-btn"
              onClick={handleProfileSubmit}
              disabled={profileLoading}
            >
              {profileLoading ? 'Saving...' : 'Continue'}
            </button>
          </div>
        )}
      </div>

      <p className="auth-disclaimer">
        By continuing, you agree to Vaidya Terms & Privacy Policy.
      </p>
    </div>
  );
}