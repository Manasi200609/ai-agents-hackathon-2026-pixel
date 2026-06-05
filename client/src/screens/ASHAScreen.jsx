import { useLanguage } from '../context/LanguageContext';

const TEXT = {
  mr: {
    title: 'ASHA दीदी',
    subtitle: 'मध्यम किंवा गंभीर लक्षणांसाठी स्थानिक आरोग्य मार्गदर्शन.',
    available: 'मदतीसाठी उपलब्ध',
    videoCall: '👩‍⚕️ ASHA दीदीशी व्हिडिओ कॉल करा',
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
    subtitle: 'मध्यम या गंभीर लक्षणों के लिए स्थानीय स्वास्थ्य मार्गदर्शन.',
    available: 'मदद के लिए उपलब्ध',
    videoCall: '👩‍⚕️ ASHA दीदी से वीडियो कॉल करें',
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
    subtitle: 'Local healthcare support for medium or serious symptoms.',
    available: 'Available for help',
    videoCall: '👩‍⚕️ Video call ASHA Worker',
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
  gu: {
    title: 'ASHA બહેન',
    subtitle: 'મધ્યમ અથવા ગંભીર લક્ષણો માટે સ્થાનિક આરોગ્ય માર્ગદર્શન.',
    available: 'મદદ માટે ઉપલબ્ધ',
    videoCall: '👩‍⚕️ ASHA બહેન સાથે વીડિયો કોલ કરો',
    phoneCall: 'ફોન કોલ',
    phoneSub: 'નેટ ઓછું હોય તો વોઇસ કોલ વાપરો.',
    phcHelp: 'PHC મદદ',
    phcSub: 'નજીકના આરોગ્ય કેન્દ્ર માટે માર્ગદર્શન.',
    seriousTitle: 'ગંભીર લક્ષણો હોય તો',
    seriousText:
      'શ્વાસ લેવામાં તકલીફ, છાતીમાં દુખાવો, વધુ રક્તસ્ત્રાવ અથવા બેભાન થવું હોય તો 108 પર સંપર્ક કરો.',
    prepareTitle: 'કોલ પહેલાં માહિતી તૈયાર રાખો',
    prepareText:
      'લક્ષણો કેટલા દિવસથી છે, તાવ છે કે નહીં અને દવા લીધી છે કે નહીં — આ માહિતી કહો.',
  },
  ta: {
    title: 'ASHA பணியாளர்',
    subtitle: 'மிதமான அல்லது கடுமையான அறிகுறிகளுக்கு உள்ளூர் சுகாதார உதவி.',
    available: 'உதவிக்கு கிடைக்கிறார்',
    videoCall: '👩‍⚕️ ASHA பணியாளருடன் வீடியோ அழைப்பு',
    phoneCall: 'தொலைபேசி அழைப்பு',
    phoneSub: 'இணையம் குறைவாக இருந்தால் குரல் அழைப்பைப் பயன்படுத்துங்கள்.',
    phcHelp: 'PHC உதவி',
    phcSub: 'அருகிலுள்ள சுகாதார மையத்திற்கான வழிகாட்டல்.',
    seriousTitle: 'அறிகுறிகள் கடுமையாக இருந்தால்',
    seriousText:
      'மூச்சுத்திணறல், நெஞ்சு வலி, அதிக இரத்தப்போக்கு அல்லது மயக்கம் இருந்தால் 108 ஐ அழைக்கவும்.',
    prepareTitle: 'அழைப்புக்கு முன் தகவலை தயார் வைத்துக்கொள்ளுங்கள்',
    prepareText:
      'அறிகுறிகள் எத்தனை நாட்களாக உள்ளன, காய்ச்சல் உள்ளதா, மருந்து எடுத்தீர்களா என்பதைச் சொல்லுங்கள்.',
  },
  te: {
    title: 'ASHA వర్కర్',
    subtitle: 'మధ్యస్థ లేదా తీవ్రమైన లక్షణాల కోసం స్థానిక ఆరోగ్య సహాయం.',
    available: 'సహాయం కోసం అందుబాటులో ఉంది',
    videoCall: '👩‍⚕️ ASHA వర్కర్‌తో వీడియో కాల్ చేయండి',
    phoneCall: 'ఫోన్ కాల్',
    phoneSub: 'ఇంటర్నెట్ బలహీనంగా ఉంటే వాయిస్ కాల్ ఉపయోగించండి.',
    phcHelp: 'PHC సహాయం',
    phcSub: 'సమీప ఆరోగ్య కేంద్రానికి మార్గదర్శనం.',
    seriousTitle: 'లక్షణాలు తీవ్రమైతే',
    seriousText:
      'శ్వాస తీసుకోవడంలో ఇబ్బంది, ఛాతి నొప్పి, అధిక రక్తస్రావం లేదా అపస్మారం ఉంటే 108 కు కాల్ చేయండి.',
    prepareTitle: 'కాల్‌కు ముందు సమాచారం సిద్ధంగా ఉంచండి',
    prepareText:
      'లక్షణాలు ఎన్ని రోజులుగా ఉన్నాయి, జ్వరం ఉందా, ఏదైనా మందు తీసుకున్నారా — ఈ సమాచారం చెప్పండి.',
  },
  kn: {
    title: 'ASHA ಕಾರ್ಯಕರ್ತೆ',
    subtitle: 'ಮಧ್ಯಮ ಅಥವಾ ಗಂಭೀರ ಲಕ್ಷಣಗಳಿಗೆ ಸ್ಥಳೀಯ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ.',
    available: 'ಸಹಾಯಕ್ಕೆ ಲಭ್ಯ',
    videoCall: '👩‍⚕️ ASHA ಕಾರ್ಯಕರ್ತೆಗೆ ವೀಡಿಯೊ ಕರೆ ಮಾಡಿ',
    phoneCall: 'ಫೋನ್ ಕರೆ',
    phoneSub: 'ಇಂಟರ್ನೆಟ್ ಕಡಿಮೆ ಇದ್ದರೆ ಧ್ವನಿ ಕರೆ ಬಳಸಿ.',
    phcHelp: 'PHC ಸಹಾಯ',
    phcSub: 'ಹತ್ತಿರದ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಮಾರ್ಗದರ್ಶನ.',
    seriousTitle: 'ಲಕ್ಷಣಗಳು ಗಂಭೀರವಾಗಿದ್ದರೆ',
    seriousText:
      'ಉಸಿರಾಟದ ತೊಂದರೆ, ಎದೆ ನೋವು, ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ ಅಥವಾ ಪ್ರಜ್ಞೆ ತಪ್ಪಿದರೆ 108 ಗೆ ಕರೆ ಮಾಡಿ.',
    prepareTitle: 'ಕರೆಗೂ ಮುನ್ನ ಮಾಹಿತಿ ಸಿದ್ಧವಾಗಿರಲಿ',
    prepareText:
      'ಲಕ್ಷಣಗಳು ಎಷ್ಟು ದಿನಗಳಿಂದಿವೆ, ಜ್ವರ ಇದೆಯೇ, ಔಷಧಿ ತೆಗೆದುಕೊಂಡಿರುವಿರಾ — ಈ ಮಾಹಿತಿ ಹೇಳಿ.',
  },
  pa: {
    title: 'ASHA ਵਰਕਰ',
    subtitle: 'ਦਰਮਿਆਨੇ ਜਾਂ ਗੰਭੀਰ ਲੱਛਣਾਂ ਲਈ ਸਥਾਨਕ ਸਿਹਤ ਸਹਾਇਤਾ.',
    available: 'ਮਦਦ ਲਈ ਉਪਲਬਧ',
    videoCall: '👩‍⚕️ ASHA ਵਰਕਰ ਨਾਲ ਵੀਡੀਓ ਕਾਲ ਕਰੋ',
    phoneCall: 'ਫੋਨ ਕਾਲ',
    phoneSub: 'ਇੰਟਰਨੈਟ ਘੱਟ ਹੋਵੇ ਤਾਂ ਵੌਇਸ ਕਾਲ ਵਰਤੋ.',
    phcHelp: 'PHC ਮਦਦ',
    phcSub: 'ਨੇੜਲੇ ਸਿਹਤ ਕੇਂਦਰ ਲਈ ਮਾਰਗਦਰਸ਼ਨ.',
    seriousTitle: 'ਜੇ ਲੱਛਣ ਗੰਭੀਰ ਹੋਣ',
    seriousText:
      'ਸਾਹ ਲੈਣ ਵਿੱਚ ਤਕਲੀਫ, ਛਾਤੀ ਦਰਦ, ਵੱਧ ਖੂਨ ਵਗਣਾ ਜਾਂ ਬੇਹੋਸ਼ੀ ਹੋਵੇ ਤਾਂ 108 ਤੇ ਕਾਲ ਕਰੋ.',
    prepareTitle: 'ਕਾਲ ਤੋਂ ਪਹਿਲਾਂ ਜਾਣਕਾਰੀ ਤਿਆਰ ਰੱਖੋ',
    prepareText:
      'ਲੱਛਣ ਕਿੰਨੇ ਦਿਨਾਂ ਤੋਂ ਹਨ, ਬੁਖਾਰ ਹੈ ਜਾਂ ਨਹੀਂ, ਅਤੇ ਦਵਾਈ ਲਈ ਹੈ ਜਾਂ ਨਹੀਂ — ਇਹ ਦੱਸੋ.',
  },
  bn: {
    title: 'ASHA কর্মী',
    subtitle: 'মাঝারি বা গুরুতর লক্ষণের জন্য স্থানীয় স্বাস্থ্য সহায়তা.',
    available: 'সহায়তার জন্য উপলব্ধ',
    videoCall: '👩‍⚕️ ASHA কর্মীর সাথে ভিডিও কল করুন',
    phoneCall: 'ফোন কল',
    phoneSub: 'ইন্টারনেট কম থাকলে ভয়েস কল ব্যবহার করুন.',
    phcHelp: 'PHC সহায়তা',
    phcSub: 'নিকটস্থ স্বাস্থ্য কেন্দ্রের জন্য নির্দেশনা.',
    seriousTitle: 'লক্ষণ গুরুতর হলে',
    seriousText:
      'শ্বাসকষ্ট, বুকের ব্যথা, বেশি রক্তপাত বা অজ্ঞান হলে 108 নম্বরে যোগাযোগ করুন.',
    prepareTitle: 'কলের আগে তথ্য প্রস্তুত রাখুন',
    prepareText:
      'লক্ষণ কতদিন ধরে আছে, জ্বর আছে কি না, ওষুধ নিয়েছেন কি না — এই তথ্য বলুন.',
  },
};

export default function ASHAScreen({ onStartCall }) {
  const { langCode } = useLanguage();
  const t = TEXT[langCode] || TEXT.en;

  return (
    <div className="asha-screen">
      <section className="asha-hero">
        <div className="asha-hero-top">
          <div className="asha-avatar">👩‍⚕️</div>
          <div>
            <h2 className="asha-title">{t.title}</h2>
            <p className="asha-subtitle">{t.subtitle}</p>
          </div>
        </div>

        <div className="asha-status">
          <span className="asha-status-dot" />
          <span>{t.available}</span>
        </div>
      </section>

      <button type="button" className="asha-primary-btn" onClick={onStartCall}>
        {t.videoCall}
      </button>

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