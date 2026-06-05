import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useHistory } from '../hooks/useHistory';

const TEXT = {
  mr: {
    title: 'मागील संवाद',
    sub: 'तुमचे जतन झालेले आरोग्य संवाद',
    loading: 'लोड होत आहे...',
    emptyTitle: 'अजून कोणताही संवाद नाही',
    emptySub: 'वैद्याशी बोलल्यावर इथे दिसेल',
    tap: 'संवाद पाहण्यासाठी टॅप करा',
    today: 'आज',
    fallbackSymptom: 'आरोग्य संवाद',
    fallbackUser: 'संवाद',
    fallbackAssistant: 'उत्तर उपलब्ध नाही',
  },
  hi: {
    title: 'पिछले संवाद',
    sub: 'आपके सेव किए हुए स्वास्थ्य संवाद',
    loading: 'लोड हो रहा है...',
    emptyTitle: 'अभी कोई संवाद नहीं',
    emptySub: 'वैद्य से बात करने के बाद यहाँ दिखेगा',
    tap: 'संवाद देखने के लिए टैप करें',
    today: 'आज',
    fallbackSymptom: 'स्वास्थ्य संवाद',
    fallbackUser: 'संवाद',
    fallbackAssistant: 'उत्तर उपलब्ध नहीं',
  },
  en: {
    title: 'Chat History',
    sub: 'Your saved health conversations',
    loading: 'Loading...',
    emptyTitle: 'No conversations yet',
    emptySub: 'Your chats with Vaidya will appear here',
    tap: 'Tap to view conversation',
    today: 'Today',
    fallbackSymptom: 'Health conversation',
    fallbackUser: 'Conversation',
    fallbackAssistant: 'No response available',
  },
  gu: {
    title: 'પાછલા સંવાદ',
    sub: 'તમારા સાચવેલા આરોગ્ય સંવાદ',
    loading: 'લોડ થઈ રહ્યું છે...',
    emptyTitle: 'હજી કોઈ સંવાદ નથી',
    emptySub: 'વૈદ્ય સાથે વાત કર્યા પછી અહીં દેખાશે',
    tap: 'સંવાદ જોવા માટે ટૅપ કરો',
    today: 'આજે',
    fallbackSymptom: 'આરોગ્ય સંવાદ',
    fallbackUser: 'સંવાદ',
    fallbackAssistant: 'જવાબ ઉપલબ્ધ નથી',
  },
  ta: {
    title: 'உரையாடல் வரலாறு',
    sub: 'உங்கள் சேமிக்கப்பட்ட சுகாதார உரையாடல்கள்',
    loading: 'ஏற்றப்படுகிறது...',
    emptyTitle: 'இன்னும் உரையாடல்கள் இல்லை',
    emptySub: 'வைத்யாவுடன் பேசின பிறகு இங்கே தோன்றும்',
    tap: 'உரையாடலை பார்க்க தட்டவும்',
    today: 'இன்று',
    fallbackSymptom: 'சுகாதார உரையாடல்',
    fallbackUser: 'உரையாடல்',
    fallbackAssistant: 'பதில் கிடைக்கவில்லை',
  },
  te: {
    title: 'చాట్ చరిత్ర',
    sub: 'మీ సేవ్ చేసిన ఆరోగ్య సంభాషణలు',
    loading: 'లోడ్ అవుతోంది...',
    emptyTitle: 'ఇంకా సంభాషణ లేదు',
    emptySub: 'వైద్యతో మాట్లాడిన తర్వాత ఇక్కడ కనిపిస్తుంది',
    tap: 'సంభాషణ చూడటానికి ట్యాప్ చేయండి',
    today: 'ఈ రోజు',
    fallbackSymptom: 'ఆరోగ్య సంభాషణ',
    fallbackUser: 'సంభాషణ',
    fallbackAssistant: 'సమాధానం అందుబాటులో లేదు',
  },
  kn: {
    title: 'ಚಾಟ್ ಇತಿಹಾಸ',
    sub: 'ನಿಮ್ಮ ಉಳಿಸಿದ ಆರೋಗ್ಯ ಸಂಭಾಷಣೆಗಳು',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    emptyTitle: 'ಇನ್ನೂ ಯಾವುದೇ ಸಂಭಾಷಣೆ ಇಲ್ಲ',
    emptySub: 'ವೈದ್ಯರೊಂದಿಗೆ ಮಾತನಾಡಿದ ನಂತರ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ',
    tap: 'ಸಂಭಾಷಣೆ ನೋಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
    today: 'ಇಂದು',
    fallbackSymptom: 'ಆರೋಗ್ಯ ಸಂಭಾಷಣೆ',
    fallbackUser: 'ಸಂಭಾಷಣೆ',
    fallbackAssistant: 'ಉತ್ತರ ಲಭ್ಯವಿಲ್ಲ',
  },
  ml: {
    title: 'ചാറ്റ് ചരിത്രം',
    sub: 'നിങ്ങളുടെ സംരക്ഷിച്ച ആരോഗ്യ സംഭാഷണങ്ങൾ',
    loading: 'ലോഡ് ചെയ്യുന്നു...',
    emptyTitle: 'ഇനിയും സംഭാഷണം ഇല്ല',
    emptySub: 'വൈദ്യയോട് സംസാരിച്ചാൽ ഇവിടെ കാണിക്കും',
    tap: 'സംഭാഷണം കാണാൻ ടാപ്പ് ചെയ്യുക',
    today: 'ഇന്ന്',
    fallbackSymptom: 'ആരോഗ്യ സംഭാഷണം',
    fallbackUser: 'സംഭാഷണം',
    fallbackAssistant: 'മറുപടി ലഭ്യമല്ല',
  },
  pa: {
    title: 'ਚੈਟ ਇਤਿਹਾਸ',
    sub: 'ਤੁਹਾਡੀਆਂ ਸੇਵ ਕੀਤੀਆਂ ਸਿਹਤ ਗੱਲਬਾਤਾਂ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    emptyTitle: 'ਹਾਲੇ ਕੋਈ ਗੱਲਬਾਤ ਨਹੀਂ',
    emptySub: 'ਵੈਦਿਆ ਨਾਲ ਗੱਲ ਕਰਨ ਤੋਂ ਬਾਅਦ ਇੱਥੇ ਦਿਖੇਗੀ',
    tap: 'ਗੱਲਬਾਤ ਵੇਖਣ ਲਈ ਟੈਪ ਕਰੋ',
    today: 'ਅੱਜ',
    fallbackSymptom: 'ਸਿਹਤ ਗੱਲਬਾਤ',
    fallbackUser: 'ਗੱਲਬਾਤ',
    fallbackAssistant: 'ਜਵਾਬ ਉਪਲਬਧ ਨਹੀਂ',
  },
  bn: {
    title: 'চ্যাট ইতিহাস',
    sub: 'আপনার সংরক্ষিত স্বাস্থ্য কথোপকথন',
    loading: 'লোড হচ্ছে...',
    emptyTitle: 'এখনও কোনো কথোপকথন নেই',
    emptySub: 'বৈদ্যের সাথে কথা বললে এখানে দেখা যাবে',
    tap: 'কথোপকথন দেখতে ট্যাপ করুন',
    today: 'আজ',
    fallbackSymptom: 'স্বাস্থ্য কথোপকথন',
    fallbackUser: 'কথোপকথন',
    fallbackAssistant: 'উত্তর উপলব্ধ নয়',
  },
};

const DATE_LOCALE = {
  mr: 'mr-IN',
  hi: 'hi-IN',
  en: 'en-IN',
  gu: 'gu-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
  bn: 'bn-IN',
  as: 'as-IN',
  ks: 'en-IN',
};

export default function HistoryScreen({ userId }) {
  const { langCode } = useLanguage();
  const { getHistory } = useHistory();

  const t = TEXT[langCode] || TEXT.en;
  const dateLocale = DATE_LOCALE[langCode] || 'en-IN';

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        if (!userId) {
          setHistory([]);
          return;
        }

        const data = await getHistory(userId);
        setHistory(data);
      } catch (err) {
        console.error('History load failed:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [userId]);

  function formatDate(timestamp) {
    if (!timestamp?.toDate) return t.today;

    return timestamp.toDate().toLocaleDateString(dateLocale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function getSymptom(item) {
    return item.symptom_summary || item.userMessage || t.fallbackSymptom;
  }

  function getMessages(item) {
    if (Array.isArray(item.messages) && item.messages.length > 0) {
      return item.messages;
    }

    return [
      {
        role: 'user',
        content: item.userMessage || item.symptom_summary || t.fallbackUser,
      },
      {
        role: 'assistant',
        content: item.aiReply || t.fallbackAssistant,
      },
    ];
  }

  return (
    <div className="screen history-screen">
      <div className="screen-header">
        <h2 className="screen-title">{t.title}</h2>
        <p className="screen-sub">{t.sub}</p>
      </div>

      {loading ? (
        <div className="empty-state">
          <p className="empty-icon">⏳</p>
          <p className="empty-title">{t.loading}</p>
        </div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📋</p>
          <p className="empty-title">{t.emptyTitle}</p>
          <p className="empty-sub">{t.emptySub}</p>
        </div>
      ) : (
        <div className="history-list compact-history-list">
          {history.map((item) => (
            <button
              key={item.id}
              type="button"
              className="history-summary-card"
              onClick={() => setSelectedChat(item)}
            >
              <div>
                <p className="history-main-symptom">{getSymptom(item)}</p>
                <p className="history-mini-label">{t.tap}</p>
              </div>

              <div className="history-side">
                <span
                  className={`history-severity severity-${(
                    item.severity || 'LOW'
                  ).toLowerCase()}`}
                >
                  {item.severity || 'LOW'}
                </span>

                <span className="history-date-small">
                  {formatDate(item.updated_at || item.created_at)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedChat && (
        <div
          className="history-modal-backdrop"
          onClick={() => setSelectedChat(null)}
        >
          <div
            className="history-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="history-modal-header">
              <div>
                <h3>{getSymptom(selectedChat)}</h3>
                <p>{formatDate(selectedChat.updated_at || selectedChat.created_at)}</p>
              </div>

              <button
                type="button"
                className="history-modal-close"
                onClick={() => setSelectedChat(null)}
              >
                ×
              </button>
            </div>

            <div className="history-modal-chat">
              {getMessages(selectedChat).map((msg, index) => (
                <div
                  key={index}
                  className={`history-chat-row ${
                    msg.role === 'user' ? 'user' : 'assistant'
                  }`}
                >
                  <div className="history-chat-bubble">{msg.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}