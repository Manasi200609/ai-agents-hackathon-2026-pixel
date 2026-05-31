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
  ta: [
    { emoji: '🤒', label: 'காய்ச்சல்', query: 'எனக்கு காய்ச்சல் இருக்கிறது' },
    { emoji: '🤕', label: 'தலைவலி', query: 'தலை வலிக்கிறது' },
    { emoji: '🤢', label: 'குமட்டல்', query: 'வயிறு குமட்டுகிறது' },
    { emoji: '😮‍💨', label: 'இருமல்', query: 'இருமல் வருகிறது' },
    { emoji: '🩸', label: 'வலி', query: 'உடல் வலிக்கிறது' },
    { emoji: '😴', label: 'சோர்வு', query: 'மிகவும் சோர்வாக இருக்கிறது' },
  ],
  te: [
    { emoji: '🤒', label: 'జ్వరం', query: 'నాకు జ్వరం వచ్చింది' },
    { emoji: '🤕', label: 'తలనొప్పి', query: 'తల నొప్పిగా ఉంది' },
    { emoji: '🤢', label: 'వికారం', query: 'పొట్టలో వికారంగా ఉంది' },
    { emoji: '😮‍💨', label: 'దగ్గు', query: 'దగ్గు వస్తోంది' },
    { emoji: '🩸', label: 'నొప్పి', query: 'ఒళ్ళు నొప్పులు ఉన్నాయి' },
    { emoji: '😴', label: 'అలసట', query: 'చాలా అలసటగా ఉంది' },
  ],
  ml: [
    { emoji: '🤒', label: 'പനി', query: 'എനിക്ക് പനിയുണ്ട്' },
    { emoji: '🤕', label: 'തലവേദന', query: 'തല വേദനിക്കുന്നു' },
    { emoji: '🤢', label: 'ഓക്കാനം', query: 'വയറ്റിൽ ഓക്കാനം തോന്നുന്നു' },
    { emoji: '😮‍💨', label: 'ചുമ', query: 'ചുമ വരുന്നു' },
    { emoji: '🩸', label: 'വേദന', query: 'ശരീരം വേദനിക്കുന്നു' },
    { emoji: '😴', label: 'ക്ഷീണം', query: 'വളരെ ക്ഷീണം തോന്നുന്നു' },
  ],
  kn: [
    { emoji: '🤒', label: 'ಜ್ವರ', query: 'ನನಗೆ ಜ್ವರ ಬಂದಿದೆ' },
    { emoji: '🤕', label: 'ತಲೆನೋವು', query: 'ತಲೆ ನೋಯುತ್ತಿದೆ' },
    { emoji: '🤢', label: 'ವಾಕರಿಕೆ', query: 'ಹೊಟ್ಟೆಯಲ್ಲಿ ವಾಕರಿಕೆ ಆಗುತ್ತಿದೆ' },
    { emoji: '😮‍💨', label: 'ಕೆಮ್ಮು', query: 'ಕೆಮ್ಮು ಬರುತ್ತಿದೆ' },
    { emoji: '🩸', label: 'ನೋವು', query: 'ಮೈ ನೋಯುತ್ತಿದೆ' },
    { emoji: '😴', label: 'ಆಯಾಸ', query: 'ತುಂಬಾ ಆಯಾಸ ಆಗಿದೆ' },
  ],
  gu: [
    { emoji: '🤒', label: 'તાવ', query: 'મને તાવ આવ્યો છે' },
    { emoji: '🤕', label: 'માથાનો દુખાવો', query: 'માથું દુખે છે' },
    { emoji: '🤢', label: 'ઉબકા', query: 'પેટમાં ઉબકા આવે છે' },
    { emoji: '😮‍💨', label: 'ઉધરસ', query: 'ઉધરસ આવે છે' },
    { emoji: '🩸', label: 'દુખાવો', query: 'આખા શરીરમાં દુખાવો છે' },
    { emoji: '😴', label: 'થાક', query: 'ખૂબ થાક લાગે છે' },
  ],
  pa: [
    { emoji: '🤒', label: 'ਬੁਖਾਰ', query: 'ਮੈਨੂੰ ਬੁਖਾਰ ਹੈ' },
    { emoji: '🤕', label: 'ਸਿਰਦਰਦ', query: 'ਸਿਰ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ' },
    { emoji: '🤢', label: 'ਮਤਲੀ', query: 'ਪੇਟ ਵਿੱਚ ਮਤਲੀ ਹੋ ਰਹੀ ਹੈ' },
    { emoji: '😮‍💨', label: 'ਖੰਘ', query: 'ਖੰਘ ਆ ਰਹੀ ਹੈ' },
    { emoji: '🩸', label: 'ਦਰਦ', query: 'ਸਰੀਰ ਵਿੱਚ ਦਰਦ ਹੈ' },
    { emoji: '😴', label: 'ਥਕਾਵਟ', query: 'ਬਹੁਤ ਥਕਾਵਟ ਲੱਗ ਰਹੀ ਹੈ' },
  ],
  bn: [
    { emoji: '🤒', label: 'জ্বর', query: 'আমার জ্বর হয়েছে' },
    { emoji: '🤕', label: 'মাথাব্যথা', query: 'মাথা ব্যথা করছে' },
    { emoji: '🤢', label: 'বমি বমি', query: 'পেটে বমি বমি ভাব আছে' },
    { emoji: '😮‍💨', label: 'কাশি', query: 'কাশি হচ্ছে' },
    { emoji: '🩸', label: 'ব্যথা', query: 'শরীরে ব্যথা আছে' },
    { emoji: '😴', label: 'ক্লান্তি', query: 'অনেক ক্লান্ত লাগছে' },
  ],
  as: [
    { emoji: '🤒', label: 'জ্বৰ', query: 'মোৰ জ্বৰ হৈছে' },
    { emoji: '🤕', label: 'মূৰৰ বিষ', query: 'মূৰ বিষাইছে' },
    { emoji: '🤢', label: 'বমি', query: 'পেটত বমি বমি লাগিছে' },
    { emoji: '😮‍💨', label: 'কাহ', query: 'কাহ আহিছে' },
    { emoji: '🩸', label: 'বিষ', query: 'গা বিষাইছে' },
    { emoji: '😴', label: 'ভাগৰ', query: 'বহুত ভাগৰ লাগিছে' },
  ],
  ks: [
    { emoji: '🤒', label: 'بُخار', query: 'مہ بُخار چھُس' },
    { emoji: '🤕', label: 'برداشت', query: 'برم دُکھان پیٹھ چھُس' },
    { emoji: '🤢', label: 'اولٹی', query: 'پیٹس مندر اولٹی لاگان چھیہٕ' },
    { emoji: '😮‍💨', label: 'کھانسی', query: 'کھانسی آوان چھیہٕ' },
    { emoji: '🩸', label: 'درد', query: 'گاشس درد چھُ' },
    { emoji: '😴', label: 'تھکاوٹ', query: 'بہُت تھکاوٹ لاگان چھیہٕ' },
  ],
};

const EMERGENCY_NUMBERS = [
  { name: 'रुग्णवाहिका', number: '108', color: '#e06060' },
  { name: 'आरोग्य हेल्पलाइन', number: '104', color: '#4f8ef7' },
];

export default function HomeScreen({ onNavigateToChat }) {
  const { langCode, ui } = useLanguage();

  const time = (() => {
    const h = new Date().getHours();
    if (h < 12) return ui.greeting + ' 🙏';
    if (h < 17) return ui.greeting + ' 🙏';
    return ui.greeting + ' 🙏';
  })();

  const symptoms = QUICK_SYMPTOMS[langCode] || QUICK_SYMPTOMS['mr'];

  return (
    <div className="screen home-screen">
      <div className="home-greeting">
        <div className="greeting-glow" />
        <p className="greeting-time">{time}</p>
        <h2 className="greeting-title">{ui.how_are_you}</h2>
        <p className="greeting-sub">{ui.speak_with_vaidya}</p>
      </div>

      <button className="chat-cta" onClick={() => onNavigateToChat()}>
        <div className="chat-cta-icon">💬</div>
        <div className="chat-cta-text">
          <span className="chat-cta-title">{ui.speak_with_vaidya}</span>
          <span className="chat-cta-sub">{ui.your_complaint}</span>
        </div>
        <span className="chat-cta-arrow">→</span>
      </button>

      <div className="section">
        <p className="section-title">{ui.quick_symptoms}</p>
        <div className="symptoms-grid">
          {symptoms.map((s) => (
            <button
              key={s.label}
              className="symptom-card"
              onClick={() => onNavigateToChat(s.query)}
            >
              <span className="symptom-emoji">{s.emoji}</span>
              <span className="symptom-label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <p className="section-title">{ui.emergency}</p>
        <div className="emergency-row">
          {EMERGENCY_NUMBERS.map((e) => (
            <a key={e.name} href={`tel:${e.number}`} className="emergency-card">
              <span className="emergency-icon">📞</span>
              <div>
                <p className="emergency-name">{e.name}</p>
                <p className="emergency-number" style={{ color: e.color }}>{e.number}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <p className="disclaimer">{ui.disclaimer}</p>
    </div>
  );
}