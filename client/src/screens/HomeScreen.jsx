import { useLanguage } from '../context/LanguageContext';

const QUICK_SYMPTOMS = {
  mr: [
    { emoji: '🤒', label: 'ताप', query: 'मला ताप आलाय' },
    { emoji: '🤕', label: 'डोकेदुखी', query: 'डोकं दुखतंय' },
    { emoji: '🤢', label: 'मळमळ', query: 'पोटात मळमळ होतंय' },
    { emoji: '😮‍💨', label: 'खोकला', query: 'खोकला येतोय' },
    { emoji: '🩸', label: 'अंगदुखी', query: 'अंग मोडतंय' },
    { emoji: '😴', label: 'थकवा', query: 'खूप थकल्यासारखं वाटतंय' },
  ],
  hi: [
    { emoji: '🤒', label: 'बुखार', query: 'मुझे बुखार है' },
    { emoji: '🤕', label: 'सिरदर्द', query: 'सिर दर्द हो रहा है' },
    { emoji: '🤢', label: 'मतली', query: 'पेट में मतली हो रही है' },
    { emoji: '😮‍💨', label: 'खांसी', query: 'खांसी आ रही है' },
    { emoji: '🩸', label: 'दर्द', query: 'शरीर में दर्द है' },
    { emoji: '😴', label: 'थकान', query: 'बहुत थकान लग रही है' },
  ],
  en: [
    { emoji: '🤒', label: 'Fever', query: 'I have fever' },
    { emoji: '🤕', label: 'Headache', query: 'I have headache' },
    { emoji: '🤢', label: 'Nausea', query: 'I feel nauseous' },
    { emoji: '😮‍💨', label: 'Cough', query: 'I have cough' },
    { emoji: '🩸', label: 'Body Pain', query: 'My body is aching' },
    { emoji: '😴', label: 'Fatigue', query: 'I feel very tired' },
  ],
  gu: [
    { emoji: '🤒', label: 'તાવ', query: 'મને તાવ આવ્યો છે' },
    { emoji: '🤕', label: 'માથાનો દુખાવો', query: 'માથું દુખે છે' },
    { emoji: '🤢', label: 'ઉબકા', query: 'પેટમાં ઉબકા આવે છે' },
    { emoji: '😮‍💨', label: 'ઉધરસ', query: 'ઉધરસ આવે છે' },
    { emoji: '🩸', label: 'દુખાવો', query: 'આખા શરીરમાં દુખાવો છે' },
    { emoji: '😴', label: 'થાક', query: 'ખૂબ થાક લાગે છે' },
  ],
};

const HOME_TEXT = {
  mr: {
    how_are_you: 'आज तुम्हाला कसे वाटत आहे?',
    quick_symptoms: 'त्वरित लक्षणे',
    emergency: 'आणीबाणी',
    ambulance: 'रुग्णवाहिका',
    healthline: 'आरोग्य हेल्पलाइन',
    disclaimer: '⚠️ वैद्य हा डॉक्टरांचा पर्याय नाही',
  },
  hi: {
    how_are_you: 'आज आप कैसा महसूस कर रहे हैं?',
    quick_symptoms: 'तुरंत लक्षण',
    emergency: 'आपातकालीन',
    ambulance: 'एम्बुलेंस',
    healthline: 'स्वास्थ्य हेल्पलाइन',
    disclaimer: '⚠️ वैद्य डॉक्टर का विकल्प नहीं है',
  },
  en: {
    how_are_you: 'How are you feeling today?',
    quick_symptoms: 'Quick Symptoms',
    emergency: 'Emergency',
    ambulance: 'Ambulance',
    healthline: 'Health Helpline',
    disclaimer: '⚠️ Vaidya is not a substitute for a doctor',
  },
  gu: {
    how_are_you: 'આજે તમને કેમ લાગે છે?',
    quick_symptoms: 'ઝડપી લક્ષણો',
    emergency: 'આપાતકાલીન સ્થિતિ',
    ambulance: 'એમ્બ્યુલન્સ',
    healthline: 'આરોગ્ય હેલ્પલાઇન',
    disclaimer: '⚠️ વૈદ્ય ડોક્ટરનો વિકલ્પ નથી',
  },
};

export default function HomeScreen({ onNavigateToChat }) {
  const { langCode, ui } = useLanguage();

  const t = {
    ...HOME_TEXT.en,
    ...(HOME_TEXT[langCode] || {}),
    ...ui,
  };

  const symptoms = QUICK_SYMPTOMS[langCode] || QUICK_SYMPTOMS.en;

  const emergencyNumbers = [
    { name: t.ambulance, number: '108', color: '#e06060' },
    { name: t.healthline, number: '104', color: '#4f8ef7' },
  ];

return (
  <div className="screen home-screen premium-home">
    <section className="premium-welcome-card">
      <div className="welcome-orb">🌿</div>

      <p className="premium-greeting">{t.greeting || 'Hello'} 🙏</p>

      <h2 className="premium-title">
        {t.how_are_you}
      </h2>

      <p className="premium-sub">
        {t.your_complaint}
      </p>
    </section>

    <button className="premium-chat-card" onClick={() => onNavigateToChat()}>
      <div className="premium-chat-icon">💬</div>

      <div className="premium-chat-text">
        <span>{t.speak_with_vaidya}</span>
        <small>{t.your_complaint}</small>
      </div>

      <div className="premium-arrow">→</div>
    </button>

    <section className="premium-section">
      <div className="premium-section-head">
        <p>{t.emergency}</p>
        <span>24/7</span>
      </div>

      <div className="premium-emergency-grid">
        {emergencyNumbers.map((e) => (
          <a key={e.number} href={`tel:${e.number}`} className="premium-emergency-card">
            <div className="premium-emergency-icon">
              {e.number === '108' ? '🚑' : '☎️'}
            </div>

            <div>
              <p>{e.name}</p>
              <strong style={{ color: e.color }}>{e.number}</strong>
            </div>
          </a>
        ))}
      </div>
    </section>

    <div className="premium-disclaimer">
      {t.disclaimer}
    </div>
  </div>
);
}