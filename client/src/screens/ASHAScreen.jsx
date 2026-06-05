import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const TEXT = {
  mr: {
    title: 'ASHA ताई',
    subtitle: 'वैद्याने तुमची लक्षणे तपासून ASHA ताईंशी संपर्क करण्याची सूचना केली आहे.',
    badge: 'AI ने सुचवलेली मदत',
    joinQueue: 'प्रतीक्षा यादीत सामील व्हा',
    alert: 'आशा ताईंशी लवकरच संपर्क होईल. कृपया प्रतीक्षा करा.',
    queueTitle: 'तुम्ही प्रतीक्षा यादीत आहात',
    queueNo: 'तुमचा क्रमांक',
    waiting: 'आशा ताई उपलब्ध झाल्यावर कॉल जोडला जाईल.',
    statusWaiting: 'स्थिती: प्रतीक्षेत',
    connectedTitle: 'ASHA ताई उपलब्ध आहेत',
    connectedText: 'आता तुम्ही ASHA ताईंशी व्हिडिओ कॉल सुरू करू शकता.',
    startCall: 'व्हिडिओ कॉल सुरू करा',
    phoneCall: 'फोन कॉल',
    phoneSub: 'नेट कमी असल्यास आवाज कॉल वापरा.',
    phcHelp: 'PHC मदत',
    phcSub: 'जवळच्या आरोग्य केंद्रासाठी मार्गदर्शन.',
    seriousTitle: 'गंभीर लक्षणे असल्यास',
    seriousText:
      'श्वास घेण्यास त्रास, छातीत दुखणे, जास्त रक्तस्त्राव किंवा बेशुद्धपणा असल्यास 108 वर संपर्क करा.',
    prepareTitle: 'कॉलपूर्वी माहिती तयार ठेवा',
    prepareText:
      'लक्षणे किती दिवसांपासून आहेत, ताप आहे का आणि औषध घेतले आहे का — ही माहिती सांगा.',
  },
  hi: {
    title: 'ASHA दीदी',
    subtitle: 'वैद्य ने आपके लक्षण देखकर ASHA दीदी से संपर्क करने की सलाह दी है.',
    badge: 'AI द्वारा सुझाई गई सहायता',
    joinQueue: 'प्रतीक्षा सूची में शामिल हों',
    alert: 'ASHA दीदी से जल्द संपर्क होगा. कृपया प्रतीक्षा करें.',
    queueTitle: 'आप प्रतीक्षा सूची में हैं',
    queueNo: 'आपका नंबर',
    waiting: 'ASHA दीदी उपलब्ध होने पर कॉल जोड़ा जाएगा.',
    statusWaiting: 'स्थिति: प्रतीक्षा में',
    connectedTitle: 'ASHA दीदी उपलब्ध हैं',
    connectedText: 'अब आप ASHA दीदी से वीडियो कॉल शुरू कर सकते हैं.',
    startCall: 'वीडियो कॉल शुरू करें',
    phoneCall: 'फोन कॉल',
    phoneSub: 'नेटवर्क कम हो तो वॉइस कॉल का उपयोग करें.',
    phcHelp: 'PHC सहायता',
    phcSub: 'नजदीकी स्वास्थ्य केंद्र के लिए मार्गदर्शन.',
    seriousTitle: 'गंभीर लक्षण होने पर',
    seriousText:
      'सांस लेने में तकलीफ, छाती में दर्द, ज्यादा खून बहना या बेहोशी हो तो 108 पर संपर्क करें.',
    prepareTitle: 'कॉल से पहले जानकारी तैयार रखें',
    prepareText:
      'लक्षण कितने दिनों से हैं, बुखार है या नहीं, और कौनसी दवा ली है — यह जानकारी बताएं.',
  },
  en: {
    title: 'ASHA Worker',
    subtitle:
      'Vaidya has reviewed your symptoms and recommended connecting with an ASHA worker.',
    badge: 'AI-recommended support',
    joinQueue: 'Join waiting queue',
    alert: 'You will be connected with an ASHA worker shortly. Please wait.',
    queueTitle: 'You are in the waiting queue',
    queueNo: 'Your queue number',
    waiting: 'The call will connect when an ASHA worker is available.',
    statusWaiting: 'Status: Waiting',
    connectedTitle: 'ASHA worker is available',
    connectedText: 'You can now start the video call with the ASHA worker.',
    startCall: 'Start video call',
    phoneCall: 'Phone Call',
    phoneSub: 'Use voice call when internet is weak.',
    phcHelp: 'PHC Help',
    phcSub: 'Guidance for nearby primary health center.',
    seriousTitle: 'If symptoms are serious',
    seriousText:
      'If there is breathing difficulty, chest pain, heavy bleeding, or unconsciousness, call 108 immediately.',
    prepareTitle: 'Keep information ready before call',
    prepareText:
      'Tell how many days symptoms are present, whether fever is present, and whether any medicine was taken.',
  },
};

export default function ASHAScreen({ onStartCall }) {
  const { langCode } = useLanguage();
  const t = TEXT[langCode] || TEXT.en;

  const [inQueue, setInQueue] = useState(false);
  const [queueNumber, setQueueNumber] = useState(null);
  const [connected, setConnected] = useState(false);

  function joinQueue() {
    const number = Math.floor(Math.random() * 4) + 1;

    setQueueNumber(number);
    setInQueue(true);
    setConnected(false);

    alert(t.alert);

    setTimeout(() => {
      setConnected(true);
    }, 7000);
  }

  function handleStartCall() {
    if (typeof onStartCall === 'function') {
      onStartCall();
    }
  }

  return (
    <div className="asha-screen">
      <section className="asha-hero">
        <div className="asha-hero-top">
          <div className="asha-avatar">👩‍⚕️</div>

          <div>
            <span className="asha-ai-badge">{t.badge}</span>
            <h2 className="asha-title">{t.title}</h2>
            <p className="asha-subtitle">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {!inQueue && (
        <button type="button" className="asha-primary-btn" onClick={joinQueue}>
          {t.joinQueue}
        </button>
      )}

      {inQueue && !connected && (
        <div className="asha-queue-card">
          <div className="asha-queue-icon">⏳</div>
          <h3>{t.queueTitle}</h3>
          <p>
            {t.queueNo}: <strong>{queueNumber}</strong>
          </p>
          <p>{t.waiting}</p>
          <span className="queue-status">{t.statusWaiting}</span>
        </div>
      )}

      {connected && (
        <div className="asha-connected-card">
          <div className="asha-queue-icon">✅</div>
          <h3>{t.connectedTitle}</h3>
          <p>{t.connectedText}</p>

          <button
            type="button"
            className="asha-primary-btn"
            onClick={handleStartCall}
          >
            {t.startCall}
          </button>
        </div>
      )}

      <div className="asha-actions">
        <button type="button" className="asha-action-card">
          <div className="asha-action-icon">📞</div>
          <h3 className="asha-action-title">{t.phoneCall}</h3>
          <p className="asha-action-sub">{t.phoneSub}</p>
        </button>

        <button type="button" className="asha-action-card">
          <div className="asha-action-icon">🏥</div>
          <h3 className="asha-action-title">{t.phcHelp}</h3>
          <p className="asha-action-sub">{t.phcSub}</p>
        </button>
      </div>

      <div className="asha-info-list">
        <article className="asha-info-card">
          <div className="asha-info-icon">⚠️</div>
          <div>
            <h3 className="asha-info-title">{t.seriousTitle}</h3>
            <p className="asha-info-text">{t.seriousText}</p>
          </div>
        </article>

        <article className="asha-info-card">
          <div className="asha-info-icon">📝</div>
          <div>
            <h3 className="asha-info-title">{t.prepareTitle}</h3>
            <p className="asha-info-text">{t.prepareText}</p>
          </div>
        </article>
      </div>
    </div>
  );
}