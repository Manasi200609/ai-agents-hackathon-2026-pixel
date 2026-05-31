import { useState } from 'react';
import { useVoice } from '../hooks/useVoice';
import { useLanguage } from '../context/LanguageContext';
import CorrectionPanel from './CorrectionPanel';
import SeverityBar from './SeverityBar';

export default function MessageBubble({ message, userInput, onCallASHA }) {
  const isUser = message.role === 'user';
  const [showCorrection, setShowCorrection] = useState(false);

  const { speak, stopSpeaking, speaking } = useVoice();
  const { ui, langCode, speechCode } = useLanguage();

  const severity = (message.severity || 'LOW').toUpperCase();

  const SEVERITY_MESSAGES = {
    MEDIUM: {
      mr: 'तुम्हाला ASHA ताईंशी बोलणे उपयुक्त ठरेल. त्या तुम्हाला जवळच्या PHC बद्दल मार्गदर्शन करतील.',
      hi: 'आपको ASHA दीदी से बात करना फायदेमंद होगा। वो आपको नजदीकी PHC के बारे में बताएंगी।',
      ta: 'ASHA அக்காவிடம் பேசுவது உதவியாக இருக்கும். அவர் அருகிலுள்ள PHC பற்றி வழிகாட்டுவார்.',
      te: 'ASHA అక్కతో మాట్లాడటం ఉపయోగకరంగా ఉంటుంది. ఆమె దగ్గరలోని PHC గురించి మార్గనిర్దేశం చేస్తారు.',
      ml: 'ASHA ചേച്ചിയോട് സംസാരിക്കുന്നത് ഉപകാരപ്രദമായിരിക്കും. അടുത്തുള്ള PHC-യെ കുറിച്ച് അവർ മാർഗ്ഗദർശനം നൽകും.',
      kn: 'ASHA ಅಕ್ಕನೊಂದಿಗೆ ಮಾತನಾಡುವುದು ಉಪಯುಕ್ತ. ಅವರು ಹತ್ತಿರದ PHC ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.',
      gu: 'ASHA બહેન સાથે વાત કરવી ઉપયોગી રહેશે. તેઓ નજીકના PHC વિશે માર્ગદર્શન આપશે.',
      bn: 'ASHA দিদির সাথে কথা বলা আপনার জন্য সহায়ক হবে। তিনি কাছের PHC সম্পর্কে গাইড করবেন।',
      pa: 'ASHA ਭੈਣ ਨਾਲ ਗੱਲ ਕਰਨਾ ਮਦਦਗਾਰ ਹੋਵੇਗਾ। ਉਹ ਨੇੜਲੇ PHC ਬਾਰੇ ਦੱਸਣਗੀਆਂ।',
      or: 'ASHA ଦିଦିଙ୍କ ସହ କଥାହେବା ଉପକାରୀ ହେବ। ସେ ନିକଟସ୍ଥ PHC ବିଷୟରେ ମାର୍ଗଦର୍ଶନ କରିବେ।',
      as: 'ASHA বাইদেউৰ সৈতে কথা পতা উপকাৰী হ\'ব। তেওঁ ওচৰৰ PHC সম্পৰ্কে গাইড কৰিব।',
      ur: 'ASHA بہن سے بات کرنا مددگار ہوگا۔ وہ قریبی PHC کے بارے میں رہنمائی کریں گی۔',
      ks: 'ASHA بہنہ سیتھ گل کرنۍ فائدہ مند ٲسِ۔ وٲہ تُہئِ نزدیکی PHC بارہ رہنمائی کریہٕ گا۔',
    },

    HIGH: {
      mr: 'हे लक्षण गंभीर असू शकते. ASHA ताईंशी लगेच बोला — त्या मदत करतील.',
      hi: 'यह लक्षण गंभीर हो सकता है। ASHA दीदी से तुरंत बात करें — वो मदद करेंगी।',
      ta: 'இந்த அறிகுறி தீவிரமாக இருக்கலாம். ASHA அக்காவிடம் உடனே பேசுங்கள்.',
      te: 'ఈ లక్షణం తీవ్రంగా ఉండవచ్చు. ASHA అక్కతో వెంటనే మాట్లాడండి.',
      ml: 'ഈ ലക്ഷണം ഗുരുതരമായിരിക്കാം. ASHA ചേച്ചിയോട് ഉടനടി സംസാരിക്കൂ.',
      kn: 'ಈ ಲಕ್ಷಣ ಗಂಭೀರವಾಗಿರಬಹುದು. ASHA ಅಕ್ಕನೊಂದಿಗೆ ತಕ್ಷಣ ಮಾತನಾಡಿ.',
      gu: 'આ લક્ષણ ગંભીર હોઈ શકે છે. તરત જ ASHA બહેન સાથે વાત કરો.',
      bn: 'এই লক্ষণটি গুরুতর হতে পারে। অবিলম্বে ASHA দিদির সাথে কথা বলুন।',
      pa: 'ਇਹ ਲੱਛਣ ਗੰਭੀਰ ਹੋ ਸਕਦਾ ਹੈ। ਤੁਰੰਤ ASHA ਭੈਣ ਨਾਲ ਗੱਲ ਕਰੋ।',
      or: 'ଏହି ଲକ୍ଷଣ ଗୁରୁତର ହୋଇପାରେ। ତୁରନ୍ତ ASHA ଦିଦିଙ୍କ ସହ କଥାହୁଅନ୍ତୁ।',
      as: 'এই লক্ষণটো গুৰুতৰ হ\'ব পাৰে। ASHA বাইদেউৰ সৈতে তৎক্ষণাৎ কথা পাতক।',
      ur: 'یہ علامت سنگین ہو سکتی ہے۔ فوراً ASHA بہن سے بات کریں۔',
      ks: 'یُہ علامت سنجیدہ ٲسِ سکٕنہٕ۔ ASHA بہنہ سیتھ ابی گل کرو۔',
    },

    EMERGENCY: {
      mr: 'ही आणीबाणी आहे. तातडीने 108 वर कॉल करा!',
      hi: 'यह आपातकाल है। तुरंत 108 पर कॉल करें!',
      ta: 'இது அவசரநிலை. உடனே 108 ஐ அழைக்கவும்!',
      te: 'ఇది అత్యవసర పరిస్థితి. వెంటనే 108కి కాల్ చేయండి!',
      ml: 'ഇത് അടിയന്തരാവസ്ഥയാണ്. ഉടനടി 108 ൽ വിളിക്കൂ!',
      kn: 'ಇದು ತುರ್ತು ಪರಿಸ್ಥಿತಿ. ತಕ್ಷಣ 108 ಗೆ ಕರೆ ಮಾಡಿ!',
      gu: 'આ આપાતકાલીન સ્થિતિ છે. તરત જ 108 પર કોલ કરો!',
      bn: 'এটি জরুরি অবস্থা। অবিলম্বে 108 নম্বরে কল করুন!',
      pa: 'ਇਹ ਐਮਰਜੈਂਸੀ ਹੈ। ਤੁਰੰਤ 108 ਤੇ ਕਾਲ ਕਰੋ!',
      or: 'ଏହା ଜରୁରୀ ସ୍ଥିତି। ତୁରନ୍ତ 108 କୁ କଲ୍ କରନ୍ତୁ!',
      as: 'এইটো জৰুৰীকালীন অৱস্থা। তৎক্ষণাৎ 108 ত ফোন কৰক!',
      ur: 'یہ ہنگامی صورتحال ہے۔ فوراً 108 پر کال کریں!',
      ks: 'یُہ ہنگامی صورتحال چھیہٕ۔ ابی 108 ہند نمبر لگاوو!',
    }
  };

  const getSeverityMessage = (sev) => {
    if (!sev || sev === 'LOW') return null;

    const msgs = SEVERITY_MESSAGES[sev];
    if (!msgs) return null;

    return msgs[langCode] || msgs.mr;
  };

  const severityMessage = getSeverityMessage(severity);

  return (
    <div className={`bubble-wrapper ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && <div className="avatar">व</div>}

      <div className="bubble-content">
        <div className={`bubble ${isUser ? 'bubble-user' : 'bubble-assistant'}`}>
          <p>{message.content}</p>
        </div>

        {!isUser && (
          <>
            {/*severityMessage && (
              <div className="severity-context-msg">
                {severityMessage}
              </div>
            )*/}

            {severity !== 'LOW' && (
              <SeverityBar
                severity={severity}
                onCallASHA={onCallASHA}
                ui={ui}
              />
            )}

            <div className="bubble-actions">
              <button
                className="action-btn speak-btn"
                onClick={() =>
                  speaking
                    ? stopSpeaking()
                    : speak(message.content, speechCode)
                }
              >
                {speaking
                  ? '⏹ ' + (ui.listen?.replace('🔊 ', '') || 'Stop')
                  : ui.listen || '🔊 ऐका'}
              </button>

              <button
                className="action-btn correct-btn"
                onClick={() => setShowCorrection(!showCorrection)}
              >
                {showCorrection
                  ? ui.cancel || 'रद्द करा'
                  : ui.correct_this || 'हे चुकीचे आहे'}
              </button>
            </div>

            {showCorrection && (
              <CorrectionPanel
              aiResponse={message.content
                .replace(/\[SEVERITY:(LOW|MEDIUM|HIGH|EMERGENCY)\]/g, "")
                .trim()}
              userInput={userInput}
              severity={severity}
              onClose={() => setShowCorrection(false)}
            />
            )}
          </>
        )}
      </div>
    </div>
  );
}