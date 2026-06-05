import { useState } from "react";
import { useAdaptive } from "../hooks/useAdaptive";
import { useLanguage } from "../context/LanguageContext";

const TEXT = {
  mr: {
    title: "वैद्याला सुधारा",
    labelCorrection: "योग्य अर्थ / सुधारणा लिहा",
    placeholder: "उदा. शरीर दुखतंय आणि थकवा आहे...",
    labelDialect: "बोली / प्रदेश निवडा",
    cancel: "रद्द करा",
    submit: "सुधारणा नोंदवा",
    submitting: "नोंदवत आहे...",
    success: "धन्यवाद! वैद्या शिकली. 🌱",
    successSub: "तुमची सुधारणा Adaptive Data मध्ये नोंदवली गेली.",
    dialects: {
      vidarbha: "विदर्भ",
      marathwada: "मराठवाडा",
      konkan: "कोकण",
      pune: "पुणे / पश्चिम महाराष्ट्र",
      varhad: "वऱ्हाड",
      rural: "ग्रामीण / स्थानिक बोली",
      other: "इतर",
    },
  },
  hi: {
    title: "वैद्य को सुधारें",
    labelCorrection: "सही अर्थ / सुधार लिखें",
    placeholder: "उदा. शरीर में दर्द और थकान है...",
    labelDialect: "बोली / क्षेत्र चुनें",
    cancel: "रद्द करें",
    submit: "सुधार दर्ज करें",
    submitting: "दर्ज हो रहा है...",
    success: "धन्यवाद! वैद्य ने सीख लिया. 🌱",
    successSub: "आपका सुधार Adaptive Data में दर्ज हो गया.",
    dialects: {
      vidarbha: "विदर्भ",
      marathwada: "मराठवाड़ा",
      konkan: "कोंकण",
      pune: "पुणे / पश्चिम महाराष्ट्र",
      varhad: "वऱ्हाड",
      rural: "ग्रामीण / स्थानीय बोली",
      other: "अन्य",
    },
  },
  en: {
    title: "Correct Vaidya",
    labelCorrection: "Write the correct meaning / correction",
    placeholder: "Example: Body pain with tiredness...",
    labelDialect: "Select dialect / region",
    cancel: "Cancel",
    submit: "Submit correction",
    submitting: "Submitting...",
    success: "Thank you! Vaidya learned. 🌱",
    successSub: "Your correction was added to Adaptive Data.",
    dialects: {
      vidarbha: "Vidarbha",
      marathwada: "Marathwada",
      konkan: "Konkan",
      pune: "Pune / Western Maharashtra",
      varhad: "Varhad",
      rural: "Rural / Local dialect",
      other: "Other",
    },
  },
  gu: {
    title: "વૈદ્યને સુધારો",
    labelCorrection: "સાચો અર્થ / સુધારો લખો",
    placeholder: "ઉદા. શરીરમાં દુખાવો અને થાક છે...",
    labelDialect: "બોલી / વિસ્તાર પસંદ કરો",
    cancel: "રદ કરો",
    submit: "સુધારો નોંધાવો",
    submitting: "નોંધાઈ રહ્યું છે...",
    success: "આભાર! વૈદ્ય શીખી ગયું. 🌱",
    successSub: "તમારો સુધારો Adaptive Data માં નોંધાયો.",
    dialects: {
      vidarbha: "વિદર્ભ",
      marathwada: "મરાઠવાડા",
      konkan: "કોંકણ",
      pune: "પુણે / પશ્ચિમ મહારાષ્ટ્ર",
      varhad: "વરહાડ",
      rural: "ગ્રામ્ય / સ્થાનિક બોલી",
      other: "બીજું",
    },
  },
  ta: {
    title: "வைத்யாவை திருத்துங்கள்",
    labelCorrection: "சரியான அர்த்தம் / திருத்தம் எழுதுங்கள்",
    placeholder: "உதா. உடல் வலி மற்றும் சோர்வு உள்ளது...",
    labelDialect: "வட்டார மொழி / பகுதி தேர்வு செய்யுங்கள்",
    cancel: "ரத்து செய்",
    submit: "திருத்தத்தை பதிவு செய்",
    submitting: "பதிவு செய்கிறது...",
    success: "நன்றி! வைத்யா கற்றுக்கொண்டது. 🌱",
    successSub: "உங்கள் திருத்தம் Adaptive Data-வில் பதிவு செய்யப்பட்டது.",
    dialects: {
      vidarbha: "விதர்பா",
      marathwada: "மராத்வாடா",
      konkan: "கொங்கண்",
      pune: "புனே / மேற்கு மகாராஷ்டிரா",
      varhad: "வர்ஹாட்",
      rural: "கிராமப்புற / உள்ளூர் வட்டாரம்",
      other: "மற்றவை",
    },
  },
  te: {
    title: "వైద్యాను సరిచేయండి",
    labelCorrection: "సరైన అర్థం / సవరణ రాయండి",
    placeholder: "ఉదా. శరీర నొప్పి మరియు అలసట ఉంది...",
    labelDialect: "మాండలికం / ప్రాంతం ఎంచుకోండి",
    cancel: "రద్దు చేయండి",
    submit: "సవరణ నమోదు చేయండి",
    submitting: "నమోదవుతోంది...",
    success: "ధన్యవాదాలు! వైద్యా నేర్చుకుంది. 🌱",
    successSub: "మీ సవరణ Adaptive Data లో నమోదు చేయబడింది.",
    dialects: {
      vidarbha: "విదర్భ",
      marathwada: "మరాఠ్వాడా",
      konkan: "కొంకణ్",
      pune: "పుణే / పశ్చిమ మహారాష్ట్ర",
      varhad: "వరహాడ్",
      rural: "గ్రామీణ / స్థానిక మాండలికం",
      other: "ఇతర",
    },
  },
  kn: {
    title: "ವೈದ್ಯನನ್ನು ಸರಿಪಡಿಸಿ",
    labelCorrection: "ಸರಿಯಾದ ಅರ್ಥ / ತಿದ್ದುಪಡಿ ಬರೆಯಿರಿ",
    placeholder: "ಉದಾ. ಮೈ ನೋವು ಮತ್ತು ಆಯಾಸ ಇದೆ...",
    labelDialect: "ಉಪಭಾಷೆ / ಪ್ರದೇಶ ಆಯ್ಕೆಮಾಡಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    submit: "ತಿದ್ದುಪಡಿ ದಾಖಲಿಸಿ",
    submitting: "ದಾಖಲಿಸಲಾಗುತ್ತಿದೆ...",
    success: "ಧನ್ಯವಾದಗಳು! ವೈದ್ಯ ಕಲಿತುಕೊಂಡಿತು. 🌱",
    successSub: "ನಿಮ್ಮ ತಿದ್ದುಪಡಿ Adaptive Data ನಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ.",
    dialects: {
      vidarbha: "ವಿದರ್ಭ",
      marathwada: "ಮರಾಠವಾಡಾ",
      konkan: "ಕೊಂಕಣ",
      pune: "ಪುಣೆ / ಪಶ್ಚಿಮ ಮಹಾರಾಷ್ಟ್ರ",
      varhad: "ವರಹಾಡ್",
      rural: "ಗ್ರಾಮೀಣ / ಸ್ಥಳೀಯ ಉಪಭಾಷೆ",
      other: "ಇತರೆ",
    },
  },
  pa: {
    title: "ਵੈਦਿਆ ਨੂੰ ਠੀਕ ਕਰੋ",
    labelCorrection: "ਸਹੀ ਅਰਥ / ਸੁਧਾਰ ਲਿਖੋ",
    placeholder: "ਉਦਾ. ਸਰੀਰ ਦਰਦ ਅਤੇ ਥਕਾਵਟ ਹੈ...",
    labelDialect: "ਬੋਲੀ / ਖੇਤਰ ਚੁਣੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    submit: "ਸੁਧਾਰ ਦਰਜ ਕਰੋ",
    submitting: "ਦਰਜ ਹੋ ਰਿਹਾ ਹੈ...",
    success: "ਧੰਨਵਾਦ! ਵੈਦਿਆ ਨੇ ਸਿੱਖ ਲਿਆ. 🌱",
    successSub: "ਤੁਹਾਡਾ ਸੁਧਾਰ Adaptive Data ਵਿੱਚ ਦਰਜ ਹੋ ਗਿਆ.",
    dialects: {
      vidarbha: "ਵਿਦਰਭ",
      marathwada: "ਮਰਾਠਵਾਡਾ",
      konkan: "ਕੋਂਕਣ",
      pune: "ਪੁਣੇ / ਪੱਛਮੀ ਮਹਾਰਾਸ਼ਟਰ",
      varhad: "ਵਰਹਾਡ",
      rural: "ਪੇਂਡੂ / ਸਥਾਨਕ ਬੋਲੀ",
      other: "ਹੋਰ",
    },
  },
  bn: {
    title: "বৈদ্যকে সংশোধন করুন",
    labelCorrection: "সঠিক অর্থ / সংশোধন লিখুন",
    placeholder: "যেমন: শরীরে ব্যথা এবং ক্লান্তি আছে...",
    labelDialect: "উপভাষা / অঞ্চল নির্বাচন করুন",
    cancel: "বাতিল",
    submit: "সংশোধন জমা দিন",
    submitting: "জমা হচ্ছে...",
    success: "ধন্যবাদ! বৈদ্য শিখেছে. 🌱",
    successSub: "আপনার সংশোধন Adaptive Data-তে সংরক্ষিত হয়েছে.",
    dialects: {
      vidarbha: "বিদর্ভ",
      marathwada: "মারাঠওয়াড়া",
      konkan: "কোঙ্কণ",
      pune: "পুনে / পশ্চিম মহারাষ্ট্র",
      varhad: "বরহাড়",
      rural: "গ্রামীণ / স্থানীয় উপভাষা",
      other: "অন্যান্য",
    },
  },
};

const DIALECT_VALUES = [
  "vidarbha",
  "marathwada",
  "konkan",
  "pune",
  "varhad",
  "rural",
  "other",
];

export default function CorrectionPanel({
  aiResponse,
  userInput,
  severity = "LOW",
  onClose,
}) {
  const { correct, correcting, correctionSuccess } = useAdaptive();
  const { langCode } = useLanguage();

  const t = TEXT[langCode] || TEXT.en;

  const [correctMeaning, setCorrectMeaning] = useState("");
  const [dialect, setDialect] = useState("");

  async function handleSubmit() {
    if (!correctMeaning.trim() || !dialect) return;

    await correct({
      original_input: userInput,
      ai_interpretation: aiResponse,
      correct_meaning: correctMeaning,
      dialect,
      language: langCode,
      severity,
      user_role: "patient",
    });

    setTimeout(onClose, 3000);
  }

  if (correctionSuccess) {
    return (
      <div className="correction-panel success">
        <p className="success-text">{t.success}</p>
        <p className="success-sub">{t.successSub}</p>
      </div>
    );
  }

  return (
    <div className="correction-panel">
      <p className="correction-title">{t.title}</p>

      <p className="correction-label">{t.labelCorrection}</p>

      <textarea
        className="correction-input"
        placeholder={t.placeholder}
        value={correctMeaning}
        onChange={(e) => setCorrectMeaning(e.target.value)}
        rows={3}
      />

      <p className="correction-label">{t.labelDialect}</p>

      <div className="dialect-options">
        {DIALECT_VALUES.map((value) => (
          <button
            key={value}
            type="button"
            className={`dialect-btn ${dialect === value ? "selected" : ""}`}
            onClick={() => setDialect(value)}
          >
            {t.dialects[value]}
          </button>
        ))}
      </div>

      <div className="correction-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          {t.cancel}
        </button>

        <button
          type="button"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!correctMeaning.trim() || !dialect || correcting}
        >
          {correcting ? t.submitting : t.submit}
        </button>
      </div>
    </div>
  );
}