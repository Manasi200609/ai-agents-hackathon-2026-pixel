import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useTranslation } from 'react-i18next';

const GENDERS = [
  { id: 'male', label_key: 'onboarding.genders.male' },
  { id: 'female', label_key: 'onboarding.genders.female' },
  { id: 'other', label_key: 'onboarding.genders.other' },
  { id: 'prefer_not', label_key: 'onboarding.genders.prefer_not' }
];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'as', name: 'অসমীয়া' },
  { code: 'ks', name: 'کٲشُر' }
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function OnboardingScreen({ onComplete }) {
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [language, setLanguage] = useState(i18n.language || 'mr');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleSave = async () => {
    if (!name.trim() || !gender || !age || !state || !district || !language) {
      setError(t('onboarding.validation_error'));
      return;
    }

    if (parseInt(age) < 1 || parseInt(age) > 120) {
      setError(t('onboarding.invalid_age'));
      return;
    }

    if (!user) return;

    setLoading(true);
    setError('');

    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: name.trim(),
        gender,
        age: parseInt(age),
        state,
        district: district.trim(),
        language,
        phone: user.phoneNumber,
        profileComplete: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, { merge: true });

      onComplete?.();
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(t('onboarding.save_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen onboarding-screen">
      <div className="screen-header">
        <h2 className="screen-title">{t('onboarding.title')}</h2>
        <p className="screen-sub">{t('onboarding.subtitle')}</p>
      </div>

      {/* Language Selector - Top Priority */}
      <div className="onboarding-section">
        <label className="onboarding-label">{t('onboarding.language')}</label>
        <div className="language-grid">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${language === lang.code ? 'selected' : ''}`}
              onClick={() => setLanguage(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="onboarding-section">
        <label className="onboarding-label">{t('onboarding.name')}</label>
        <input
          className="onboarding-input"
          type="text"
          placeholder={t('onboarding.name_placeholder')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
        />
      </div>

      {/* Gender */}
      <div className="onboarding-section">
        <label className="onboarding-label">{t('onboarding.gender')}</label>
        <div className="gender-options">
          {GENDERS.map((g) => (
            <button
              key={g.id}
              className={`gender-btn ${gender === g.id ? 'selected' : ''}`}
              onClick={() => setGender(g.id)}
            >
              {t(g.label_key)}
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div className="onboarding-section">
        <label className="onboarding-label">{t('onboarding.age')}</label>
        <input
          className="onboarding-input"
          type="number"
          placeholder={t('onboarding.age_placeholder')}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="1"
          max="120"
        />
      </div>

      {/* State */}
      <div className="onboarding-section">
        <label className="onboarding-label">{t('onboarding.state')}</label>
        <select
          className="onboarding-select"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">{t('onboarding.select_state')}</option>
          {STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* District */}
      <div className="onboarding-section">
        <label className="onboarding-label">{t('onboarding.district')}</label>
        <input
          className="onboarding-input"
          type="text"
          placeholder={t('onboarding.district_placeholder')}
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          maxLength={50}
        />
      </div>

      {error && <p className="onboarding-error">{error}</p>}

      <button
        className="save-btn"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? `${t('onboarding.saving')}...` : t('onboarding.continue')}
      </button>
    </div>
  );
}
