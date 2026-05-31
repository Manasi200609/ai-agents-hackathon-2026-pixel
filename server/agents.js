const Groq = require("groq-sdk");
const { getAdaptiveHints } = require("./adaptive");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODEL = "llama-3.1-8b-instant";

const LANGUAGE_NAMES = {
  mr: "Marathi",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  gu: "Gujarati",
  pa: "Punjabi",
  bn: "Bengali",
  or: "Odia",
  as: "Assamese",
  ks: "Kashmiri",
  ur: "Urdu",
  mai: "Maithili",
  doi: "Dogri",
  kok: "Konkani",
  mni: "Manipuri",
  ne: "Nepali",
  sa: "Sanskrit",
  sat: "Santali",
};

const LANGUAGE_SCRIPTS = {
  mr: "Devanagari script",
  hi: "Devanagari script",
  ta: "Tamil script",
  te: "Telugu script",
  kn: "Kannada script",
  ml: "Malayalam script",
  gu: "Gujarati script",
  pa: "Gurmukhi script",
  bn: "Bengali script",
  or: "Odia script",
  as: "Assamese/Bengali script",
  ks: "Perso-Arabic Kashmiri script",
  ur: "Urdu Nastaliq script",
  mai: "Devanagari script",
  doi: "Devanagari script",
  kok: "Devanagari script",
  mni: "Meitei Mayek script",
  ne: "Devanagari script",
  sa: "Devanagari script",
  sat: "Ol Chiki script",
};

async function callGroq(systemPrompt, userPrompt) {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.15,
  });

  return completion.choices[0]?.message?.content || "";
}

function safeJsonParse(text, fallback) {
  try {
    const cleaned = String(text || "")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return fallback;
  }
}

function cleanSeverityTag(text) {
  return String(text || "")
    .replace(/\[SEVERITY:(LOW|MEDIUM|HIGH|EMERGENCY)\]/gi, "")
    .trim();
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[।.!?]+$/g, "")
    .trim();
}

async function languageAgent(userText, selectedLanguage) {
  const selectedLanguageName = LANGUAGE_NAMES[selectedLanguage] || "Marathi";

  const systemPrompt = `
You are the Language Agent for Vaidya.

Return ONLY valid JSON.

Your job:
- Detect user's language.
- Detect dialect or mixed language.
- Normalize the symptom text without changing meaning.
- Do not translate into English unless needed for understanding.
- Respect selected language.

JSON format:
{
  "detectedLanguage": "",
  "selectedLanguage": "",
  "selectedLanguageName": "",
  "isDialect": true,
  "dialectHints": [],
  "normalizedText": ""
}
`;

  const userPrompt = `
Selected language code: ${selectedLanguage}
Selected language name: ${selectedLanguageName}
User message:
${userText}
`;

  const result = await callGroq(systemPrompt, userPrompt);

  return safeJsonParse(result, {
    detectedLanguage: selectedLanguageName,
    selectedLanguage,
    selectedLanguageName,
    isDialect: false,
    dialectHints: [],
    normalizedText: userText,
  });
}

async function symptomAgent(conversationContext, languageData, adaptiveHints = []) {
  const systemPrompt = `
You are the Symptom Understanding Agent for Vaidya.

Return ONLY valid JSON.

Your job:
- Understand the full conversation.
- Use previous assistant questions and latest user answers together.
- Use adaptive correction hints as trusted memory.
- If the user's phrase matches an adaptive hint, use the corrected meaning.
- If adaptive hints say a phrase means bleeding, body pain, dizziness, nausea, breathing difficulty, palpitations, weakness, etc., treat that as the true symptom meaning.
- If user says only a number like "5" after being asked duration, understand it as days.
- If user says "nahi", "no", "नाही", "नहीं", "ना", "nhi", understand it as a negative answer.
- Identify warning symptoms ONLY if the user clearly mentions them OR adaptive hints clearly indicate them.
- Do NOT invent symptoms from assistant questions.
- Do NOT diagnose disease.

JSON format:
{
  "originalText": "",
  "mainSymptom": "",
  "interpretedSymptoms": [],
  "possibleMeaning": "",
  "warningSymptoms": [],
  "durationDays": null,
  "hasNegativeAnswer": false,
  "usedAdaptiveHint": false,
  "adaptiveMeaning": "",
  "confidence": 0
}
`;

  const userPrompt = `
Conversation:
${conversationContext}

Language data:
${JSON.stringify(languageData, null, 2)}

Adaptive correction hints:
${JSON.stringify(adaptiveHints || [], null, 2)}
`;

  const result = await callGroq(systemPrompt, userPrompt);

  return safeJsonParse(result, {
    originalText: conversationContext,
    mainSymptom: "",
    interpretedSymptoms: [],
    possibleMeaning: "Unable to clearly understand symptoms",
    warningSymptoms: [],
    durationDays: null,
    hasNegativeAnswer: false,
    usedAdaptiveHint: false,
    adaptiveMeaning: "",
    confidence: 40,
  });
}

function isNegativeResponse(text) {
  const msg = normalizeText(text);

  const negativeWords = [
    "नाही",
    "नहीं",
    "नहि",
    "nahi",
    "nhi",
    "nai",
    "na",
    "no",
    "nope",
    "nah",
    "mahi",
    "ना",
    "नाय",
    "नाहीये",
  ];

  return negativeWords.includes(msg);
}

function applyRiskController(userOnlyContext, symptomData) {
  const userText = normalizeText(userOnlyContext);

  const symptomText = [
    symptomData?.mainSymptom,
    ...(symptomData?.interpretedSymptoms || []),
    symptomData?.possibleMeaning,
    symptomData?.adaptiveMeaning,
    ...(symptomData?.warningSymptoms || []),
  ]
    .join(" ")
    .toLowerCase();

  const combinedText = `${userText} ${symptomText}`;

  const strongConcernWords = [
    "खूप",
    "जास्त",
    "बहुत",
    "तीव्र",
    "वारंवार",
    "वाढत आहे",
    "कमी होत नाही",
    "ठीक नहीं",
    "khup",
    "jasta",
    "severe",
    "heavy",
    "lots",
    "too much",
    "repeated",
    "worsening",
    "not improving",
  ];

  const emergencyPhrases = [
    "chest pain",
    "difficulty breathing",
    "can't breathe",
    "cannot breathe",
    "unconscious",
    "severe bleeding",
    "blood is not stopping",
    "seizure",
    "fits",

    "छातीत दुख",
    "छाती दुख",
    "श्वास घ्यायला त्रास",
    "श्वास घेण्यास त्रास",
    "सांस लेने में तकलीफ",
    "सांस नहीं",
    "दम घुट",
    "बेशुद्ध",
    "बेहोश",
    "रक्त थांबत नाही",
    "खून नहीं रुक",
    "रक्तस्राव थांबत नाही",
    "दौरा",

    "છાતીમાં દુખાવો",
    "શ્વાસ લેવામાં તકલીફ",
    "બેભાન",

    "ಎದೆ ನೋವು",
    "ಉಸಿರಾಟಕ್ಕೆ ತೊಂದರೆ",
    "ಪ್ರಜ್ಞೆ ಇಲ್ಲ",

    "மார்பு வலி",
    "சுவாசிக்க சிரமம்",
    "மயக்கம்",

    "ఛాతి నొప్పి",
    "శ్వాస తీసుకోవడంలో ఇబ్బంది",
    "స్పృహ లేదు",
  ];

  const riskySymptomWords = [
    "blood",
    "bleeding",
    "breathing",
    "breathless",
    "dizziness",
    "fainting",
    "unconscious",
    "vomiting",
    "loose motions",
    "chest",
    "weakness",
    "severe pain",

    "रक्त",
    "रक्तस्राव",
    "खून",
    "श्वास",
    "सांस",
    "चक्कर",
    "बेशुद्ध",
    "बेहोश",
    "उलटी",
    "दस्त",
    "जुलाब",
    "छाती",
    "अशक्तपणा",

    "લોહી",
    "શ્વાસ",
    "ચક્કર",
    "ઉલટી",
    "છાતી",

    "ರಕ್ತ",
    "ಉಸಿರಾಟ",
    "ತಲೆಸುತ್ತು",
    "ವಾಂತಿ",
    "ಎದೆ",

    "ரத்தம்",
    "மூச்சு",
    "தலைசுற்றல்",
    "வாந்தி",
    "மார்பு",

    "రక్తం",
    "శ్వాస",
    "తల తిరగడం",
    "వాంతి",
    "ఛాతి",
  ];

  const hasNegativeAnswer = isNegativeResponse(userText);

  const hasStrongConcern = strongConcernWords.some((word) =>
    combinedText.includes(word)
  );

  const hasEmergency = emergencyPhrases.some((phrase) =>
    combinedText.includes(phrase)
  );

  const hasRiskySymptom =
    !hasNegativeAnswer &&
    riskySymptomWords.some((word) => combinedText.includes(word));

  const durationDays = Number(symptomData?.durationDays) || null;
  const hasLongDuration = durationDays >= 3;

  if (hasEmergency) {
    return {
      severity: "EMERGENCY",
      needsASHA: false,
      needsEmergency: true,
      needsClarification: false,
      reason: "Emergency symptom reported by user.",
      recommendedAction: "Call 108 immediately.",
    };
  }

  if (hasRiskySymptom && hasStrongConcern) {
    return {
      severity: "HIGH",
      needsASHA: true,
      needsEmergency: false,
      needsClarification: false,
      reason: "Risky symptom with strong severity words.",
      recommendedAction: "Talk to ASHA worker and visit PHC/doctor soon.",
    };
  }

  if (hasRiskySymptom) {
    return {
      severity: "LOW",
      needsASHA: false,
      needsEmergency: false,
      needsClarification: true,
      reason: "Potentially serious symptom, but severity details are missing.",
      recommendedAction: "Ask one clarification question before escalation.",
    };
  }

  if (hasLongDuration && hasStrongConcern) {
    return {
      severity: "MEDIUM",
      needsASHA: true,
      needsEmergency: false,
      needsClarification: false,
      reason: "Long duration with strong concern.",
      recommendedAction: "Talk to ASHA worker or get PHC guidance.",
    };
  }

  return {
    severity: "LOW",
    needsASHA: false,
    needsEmergency: false,
    needsClarification: false,
    reason: "No user-reported emergency or warning symptom detected.",
    recommendedAction: "Ask follow-up question or give basic safe advice.",
  };
}

function getLastAssistantMessage(messages = []) {
  return (
    [...messages]
      .reverse()
      .find((m) => m.role === "assistant")?.content || ""
  );
}

function wasWarningQuestionAsked(text) {
  const msg = normalizeText(text);

  return (
    msg.includes("गंभीर लक्षण") ||
    msg.includes("दुष्फलित") ||
    msg.includes("चक्कर") ||
    msg.includes("अंधुक") ||
    msg.includes("श्वास") ||
    msg.includes("सांस") ||
    msg.includes("उलटी") ||
    msg.includes("दस्त") ||
    msg.includes("जुलाब") ||
    msg.includes("रक्त") ||
    msg.includes("खून") ||
    msg.includes("serious symptom") ||
    msg.includes("warning symptom") ||
    msg.includes("breathing") ||
    msg.includes("blood")
  );
}

function userConfirmedRiskySymptom(text) {
  const msg = normalizeText(text);

  const yesWords = [
    "ho",
    "haa",
    "ha",
    "yes",
    "हो",
    "हां",
    "हाँ",
    "आहे",
    "aahe",
    "ahe",
  ];

  const riskyWords = [
    "rakta",
    "rakt",
    "blood",
    "bleeding",
    "रक्त",
    "रक्तस्राव",
    "खून",
    "श्वास",
    "सांस",
    "चक्कर",
    "उलटी",
    "दस्त",
    "जुलाब",
    "छाती",
  ];

  const hasYes = yesWords.some((w) => msg.includes(w));
  const hasRisk = riskyWords.some((w) => msg.includes(w));

  return hasRisk || (hasYes && msg.length <= 12);
}

function buildTriagePlan(
  conversationContext,
  userOnlyContext,
  latestUserMessage,
  symptomData,
  riskData,
  lastAssistantMessage
) {
  const allText = normalizeText(conversationContext);
  const userText = normalizeText(userOnlyContext);
  const latest = normalizeText(latestUserMessage);

  const mildWords = [
    "थोड",
    "थोड़ा",
    "thoda",
    "little",
    "कमी",
    "less",
    "हलका",
    "mild",
  ];

  const strongConcernWords = [
    "खूप",
    "जास्त",
    "बहुत",
    "तीव्र",
    "khup",
    "jasta",
    "severe",
    "heavy",
    "lots",
    "more",
  ];

  const isNegativeAnswer = isNegativeResponse(latestUserMessage);
  const isMildAnswer = mildWords.some((word) => latest.includes(word));
  const isStrongAnswer = strongConcernWords.some((word) =>
    latest.includes(word)
  );

  const previousWasWarningQuestion = wasWarningQuestionAsked(lastAssistantMessage);
  const userConfirmedWarning = userConfirmedRiskySymptom(latestUserMessage);

  const durationKnown =
    Number(symptomData?.durationDays) > 0 ||
    /\b[1-9]\b/.test(userText) ||
    userText.includes("दिवस") ||
    userText.includes("दिन") ||
    userText.includes("days") ||
    userText.includes("દિવસ") ||
    userText.includes("ದಿನ");

  const dangerQuestionAsked =
    allText.includes("गंभीर लक्षण") ||
    allText.includes("दुष्फलित लक्षण") ||
    allText.includes("serious symptoms") ||
    allText.includes("warning symptoms") ||
    allText.includes("चक्कर") ||
    allText.includes("धुंधला") ||
    allText.includes("अंधुक") ||
    allText.includes("श्वास") ||
    allText.includes("सांस") ||
    allText.includes("उलटी") ||
    allText.includes("दस्त") ||
    allText.includes("जुलाब") ||
    allText.includes("रक्त") ||
    allText.includes("खून") ||
    allText.includes("dizziness") ||
    allText.includes("breathing") ||
    allText.includes("blood");

  const clarificationAsked =
    allText.includes("किती प्रमाणात") ||
    allText.includes("किती जास्त") ||
    allText.includes("जास्त आहे का") ||
    allText.includes("गंभीर आहे का") ||
    allText.includes("how much") ||
    allText.includes("how severe") ||
    allText.includes("कितना") ||
    allText.includes("ज्यादा");

  if (riskData?.severity === "EMERGENCY") {
    return {
      mode: "EMERGENCY_ACTION",
      nextSlot: null,
      displaySeverity: "EMERGENCY",
    };
  }

  if (previousWasWarningQuestion && userConfirmedWarning) {
    return {
      mode: "ASHA_ADVICE",
      nextSlot: null,
      displaySeverity: "MEDIUM",
    };
  }

  if (riskData?.needsClarification) {
    if (clarificationAsked && isStrongAnswer) {
      return {
        mode: "ASHA_ADVICE",
        nextSlot: null,
        displaySeverity: "HIGH",
      };
    }

    if (clarificationAsked && (isNegativeAnswer || isMildAnswer)) {
      return {
        mode: "BASIC_ADVICE",
        nextSlot: null,
        displaySeverity: "LOW",
      };
    }

    if (!clarificationAsked) {
      return {
        mode: "ASK_SLOT",
        nextSlot: "clarification",
        displaySeverity: "LOW",
      };
    }
  }

  if (riskData?.severity === "HIGH" || riskData?.severity === "MEDIUM") {
    return {
      mode: "ASHA_ADVICE",
      nextSlot: null,
      displaySeverity: riskData.severity,
    };
  }

  if (!durationKnown) {
    return {
      mode: "ASK_SLOT",
      nextSlot: "duration",
      displaySeverity: "LOW",
    };
  }

  if (!dangerQuestionAsked && !isNegativeAnswer) {
    return {
      mode: "ASK_SLOT",
      nextSlot: "red_flags",
      displaySeverity: "LOW",
    };
  }

  return {
    mode: "BASIC_ADVICE",
    nextSlot: null,
    displaySeverity: "LOW",
  };
}

async function generateNaturalQuestion({
  slot,
  selectedLanguage,
  symptomData,
}) {
  const responseLanguage = LANGUAGE_NAMES[selectedLanguage] || "Marathi";
  const responseScript = LANGUAGE_SCRIPTS[selectedLanguage] || "native script";

  const slotMeaning = {
    duration:
      "Ask how long the symptom has been present.",
    red_flags:
      "Ask if the user has any serious warning signs. Ask only one compact question.",
    clarification:
      "Ask the single most important missing detail needed to understand how serious the symptom is. Do not mention ASHA, PHC, doctor, or emergency.",
  };

  const fallbackQuestions = {
    mr: {
      duration: "हा त्रास किती दिवसांपासून आहे?",
      red_flags:
        "यासोबत चक्कर, अंधुक दिसणे, श्वासाचा त्रास, उलटी, जुलाब किंवा रक्त येणे असे काही आहे का?",
      clarification: "हा त्रास किती जास्त आहे?",
    },
    hi: {
      duration: "यह तकलीफ कितने दिनों से है?",
      red_flags:
        "इसके साथ चक्कर, धुंधला दिखना, सांस में तकलीफ, उल्टी, दस्त या खून आना है क्या?",
      clarification: "यह तकलीफ कितनी ज्यादा है?",
    },
    gu: {
      duration: "આ તકલીફ કેટલા દિવસથી છે?",
      red_flags:
        "આ સાથે ચક્કર, ધૂંધળું દેખાવું, શ્વાસમાં તકલીફ, ઉલટી, ઝાડા કે લોહી આવે છે?",
      clarification: "આ તકલીફ કેટલી વધારે છે?",
    },
  };

  const fallback =
    fallbackQuestions[selectedLanguage]?.[slot] ||
    fallbackQuestions.mr[slot];

  try {
    const systemPrompt = `
You are Vaidya, a rural healthcare assistant.

Your job is to write ONE natural follow-up question.

Language: ${responseLanguage}
Script: ${responseScript}

Question intent:
${slotMeaning[slot]}

Rules:
- Ask only ONE question.
- Keep it short and natural.
- Do not give advice.
- Do not mention ASHA.
- Do not mention PHC.
- Do not mention 108.
- Do not mention emergency.
- Do not diagnose disease.
- Do not use Roman transliteration.
- Return only the question text.
`;

    const userPrompt = `
Symptom data:
${JSON.stringify(symptomData, null, 2)}
`;

    const question = cleanSeverityTag(await callGroq(systemPrompt, userPrompt));

    const banned =
      question.includes("ASHA") ||
      question.includes("108") ||
      question.includes("PHC") ||
      question.includes("आणीबाणी") ||
      question.includes("आपातकाल") ||
      question.includes("emergency") ||
      question.includes("Translation") ||
      question.length < 5 ||
      question.length > 180;

    if (banned) return fallback;

    return question;
  } catch {
    return fallback;
  }
}

function getBasicAdvice(language, symptomData) {
  const symptomText = [
    symptomData?.mainSymptom,
    ...(symptomData?.interpretedSymptoms || []),
    symptomData?.possibleMeaning,
    symptomData?.adaptiveMeaning,
  ]
    .join(" ")
    .toLowerCase();

  const isFever =
    symptomText.includes("fever") ||
    symptomText.includes("ताप") ||
    symptomText.includes("बुखार") ||
    symptomText.includes("તાવ");

  const isHeadache =
    symptomText.includes("headache") ||
    symptomText.includes("डोके") ||
    symptomText.includes("सिर दर्द") ||
    symptomText.includes("माथा") ||
    symptomText.includes("માથાનો");

  const isStomachPain =
    symptomText.includes("stomach") ||
    symptomText.includes("abdominal") ||
    symptomText.includes("पोट") ||
    symptomText.includes("पेट") ||
    symptomText.includes("પેટ");

  const advice = {
    fever: {
      mr: "आराम करा, पुरेसे पाणी प्या आणि कपाळावर थंड पाण्याची पट्टी ठेवा. ताप वाढला किंवा टिकून राहिला तर डॉक्टरांचा सल्ला घ्या.",
      hi: "आराम करें, पर्याप्त पानी पिएं और माथे पर ठंडे पानी की पट्टी रखें। बुखार बढ़े या बना रहे तो डॉक्टर से सलाह लें।",
      gu: "આરામ કરો, પૂરતું પાણી પીવો અને કપાળ પર ઠંડા પાણીની પટ્ટી રાખો. તાવ વધે અથવા ચાલુ રહે તો ડૉક્ટરની સલાહ લો.",
      kn: "ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ನೆತ್ತಿಯ ಮೇಲೆ ತಣ್ಣೀರು ಬಟ್ಟೆ ಇಡಿ. ಜ್ವರ ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      ta: "ஓய்வு எடுங்கள், போதுமான தண்ணீர் குடியுங்கள் மற்றும் நெற்றியில் குளிர்ந்த நீர் துணி வையுங்கள். காய்ச்சல் தொடர்ந்தால் மருத்துவரை அணுகுங்கள்.",
      te: "విశ్రాంతి తీసుకోండి, తగినంత నీరు తాగండి మరియు నుదుటిపై చల్లని నీటి గుడ్డ పెట్టండి. జ్వరం కొనసాగితే వైద్యుడిని సంప్రదించండి.",
      ml: "വിശ്രമിക്കൂ, മതിയായ വെള്ളം കുടിക്കൂ, നെറ്റിയിൽ തണുത്ത വെള്ളത്തിലുള്ള തുണി വയ്ക്കൂ. പനി തുടരുകയാണെങ്കിൽ ഡോക്ടറുടെ ഉപദേശം തേടൂ.",
    },
    headache: {
      mr: "थोडा आराम करा, पाणी प्या आणि तेज प्रकाश किंवा स्क्रीनपासून थोडं दूर राहा. दुखणं वाढलं किंवा कमी झालं नाही तर डॉक्टरांचा सल्ला घ्या.",
      hi: "थोड़ा आराम करें, पानी पिएं और तेज रोशनी या स्क्रीन से थोड़ा दूर रहें। दर्द बढ़े या कम न हो तो डॉक्टर से सलाह लें।",
      gu: "થોડો આરામ કરો, પાણી પીવો અને તેજ પ્રકાશ અથવા સ્ક્રીનથી થોડું દૂર રહો. દુખાવો વધે અથવા ઓછો ન થાય તો ડૉક્ટરની સલાહ લો.",
      kn: "ಸ್ವಲ್ಪ ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ತೀವ್ರ ಬೆಳಕು ಅಥವಾ ಪರದೆಗಳಿಂದ ದೂರಿರಿ. ನೋವು ಹೆಚ್ಚಾದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      ta: "சிறிது ஓய்வு எடுங்கள், தண்ணீர் குடியுங்கள், அதிக ஒளி அல்லது திரையிலிருந்து சிறிது விலகி இருங்கள். வலி அதிகரித்தால் மருத்துவரை அணுகுங்கள்.",
      te: "కొంచెం విశ్రాంతి తీసుకోండి, నీరు తాగండి, ఎక్కువ వెలుతురు లేదా స్క్రీన్‌ నుండి కొంచెం దూరంగా ఉండండి. నొప్పి పెరిగితే వైద్యుడిని సంప్రదించండి.",
      ml: "കുറച്ച് വിശ്രമിക്കൂ, വെള്ളം കുടിക്കൂ, കടുത്ത വെളിച്ചം അല്ലെങ്കിൽ സ്ക്രീനിൽ നിന്ന് കുറച്ച് മാറി നിൽക്കൂ. വേദന കൂടിയാൽ ഡോക്ടറുടെ ഉപദേശം തേടൂ.",
    },
    stomach: {
      mr: "हलका आहार घ्या, पुरेसे पाणी प्या आणि जड किंवा तेलकट अन्न टाळा. पोटदुखी वाढली किंवा कमी झाली नाही तर डॉक्टरांचा सल्ला घ्या.",
      hi: "हल्का खाना खाएं, पर्याप्त पानी पिएं और भारी या तेल वाला खाना टालें। पेट दर्द बढ़े या कम न हो तो डॉक्टर से सलाह लें।",
      gu: "હળવો ખોરાક લો, પૂરતું પાણી પીવો અને ભારે કે તેલવાળો ખોરાક ટાળો. પેટદુખાવો વધે અથવા ઓછો ન થાય તો ડૉક્ટરની સલાહ લો.",
    },
    general: {
      mr: "आराम करा, पुरेसे पाणी प्या आणि त्रास वाढला किंवा टिकून राहिला तर डॉक्टरांचा सल्ला घ्या.",
      hi: "आराम करें, पर्याप्त पानी पिएं और तकलीफ बढ़े या बनी रहे तो डॉक्टर से सलाह लें।",
      gu: "આરામ કરો, પૂરતું પાણી પીવો અને તકલીફ વધે અથવા ચાલુ રહે તો ડૉક્ટરની સલાહ લો.",
      kn: "ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ತೊಂದರೆ ಮುಂದುವರಿದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      ta: "ஓய்வு எடுங்கள், போதுமான தண்ணீர் குடியுங்கள், பிரச்சனை தொடர்ந்தால் மருத்துவரை அணுகுங்கள்.",
      te: "విశ్రాంతి తీసుకోండి, తగినంత నీరు తాగండి, సమస్య కొనసాగితే వైద్యుడిని సంప్రదించండి.",
      ml: "വിശ്രമിക്കൂ, മതിയായ വെള്ളം കുടിക്കൂ, ബുദ്ധിമുട്ട് തുടരുകയാണെങ്കിൽ ഡോക്ടറുടെ ഉപദേശം തേടൂ.",
    },
  };

  if (isFever) return advice.fever[language] || advice.fever.mr;
  if (isHeadache) return advice.headache[language] || advice.headache.mr;
  if (isStomachPain) {
    return advice.stomach[language] || advice.general[language] || advice.general.mr;
  }

  return advice.general[language] || advice.general.mr;
}

function getActionAdvice(language, triagePlan, riskData, symptomData) {
  const symptomText = [
    symptomData?.mainSymptom,
    ...(symptomData?.interpretedSymptoms || []),
    symptomData?.possibleMeaning,
    symptomData?.adaptiveMeaning,
  ]
    .join(" ")
    .toLowerCase();

  const isBleeding =
    symptomText.includes("bleeding") ||
    symptomText.includes("blood") ||
    symptomText.includes("रक्त") ||
    symptomText.includes("रक्तस्राव") ||
    symptomText.includes("खून") ||
    symptomText.includes("rakta") ||
    symptomText.includes("rakt");

  if (triagePlan?.mode === "EMERGENCY_ACTION") {
    const emergencyAdvice = {
      mr: "ही आणीबाणी असू शकते. तातडीने 108 वर कॉल करा.",
      hi: "यह आपातकाल हो सकता है। तुरंत 108 पर कॉल करें।",
      gu: "આ આપાતકાલીન સ્થિતિ હોઈ શકે છે. તરત 108 પર કૉલ કરો.",
      kn: "ಇದು ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಆಗಿರಬಹುದು. ತಕ್ಷಣ 108 ಗೆ ಕರೆ ಮಾಡಿ.",
      ta: "இது அவசர நிலையாக இருக்கலாம். உடனே 108 ஐ அழைக்கவும்.",
      te: "ఇది అత్యవసర పరిస్థితి కావచ్చు. వెంటనే 108కి కాల్ చేయండి.",
      ml: "ഇത് അടിയന്തരാവസ്ഥയായിരിക്കാം. ഉടൻ 108-ൽ വിളിക്കൂ.",
    };

    return emergencyAdvice[language] || emergencyAdvice.mr;
  }

  if (triagePlan?.mode === "ASHA_ADVICE") {
    if (isBleeding) {
      const bleedingAdvice = {
        mr: "रक्तस्राव होत असेल तर ASHA ताईंशी बोला किंवा जवळच्या PHC/डॉक्टरांकडे जा.",
        hi: "खून आ रहा हो तो ASHA दीदी से बात करें या नजदीकी PHC/डॉक्टर के पास जाएं।",
        gu: "લોહી આવતું હોય તો ASHA બહેન સાથે વાત કરો અથવા નજીકના PHC/ડૉક્ટર પાસે જાઓ.",
        kn: "ರಕ್ತ ಬರುತ್ತಿದ್ದರೆ ASHA ಅಕ್ಕನೊಂದಿಗೆ ಮಾತನಾಡಿ ಅಥವಾ ಹತ್ತಿರದ PHC/ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.",
        ta: "ரத்தம் வந்தால் ASHA அக்காவிடம் பேசுங்கள் அல்லது அருகிலுள்ள PHC/மருத்துவரை அணுகுங்கள்.",
        te: "రక్తం వస్తే ASHA అక్కతో మాట్లాడండి లేదా దగ్గరలోని PHC/వైద్యుడిని సంప్రదించండి.",
        ml: "രക്തസ്രാവമുണ്ടെങ്കിൽ ASHA ചേച്ചിയോട് സംസാരിക്കൂ അല്ലെങ്കിൽ അടുത്ത PHC/ഡോക്ടറെ കാണൂ.",
      };

      return bleedingAdvice[language] || bleedingAdvice.mr;
    }

    const generalAshaAdvice = {
      mr: "हा त्रास गंभीर होऊ शकतो. ASHA ताईंशी बोला, त्या तुम्हाला PHC किंवा पुढील उपचारांबद्दल मार्गदर्शन करतील.",
      hi: "यह तकलीफ गंभीर हो सकती है। ASHA दीदी से बात करें, वे आपको PHC या आगे की मदद के बारे में बताएंगी।",
      gu: "આ તકલીફ ગંભીર હોઈ શકે છે. ASHA બહેન સાથે વાત કરો, તેઓ તમને PHC અથવા આગળની મદદ વિશે માર્ગદર્શન આપશે.",
      kn: "ಈ ತೊಂದರೆ ಗಂಭೀರವಾಗಿರಬಹುದು. ASHA ಅಕ್ಕನೊಂದಿಗೆ ಮಾತನಾಡಿ, ಅವರು PHC ಅಥವಾ ಮುಂದಿನ ಸಹಾಯದ ಬಗ್ಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾರೆ.",
      ta: "இந்த பிரச்சனை தீவிரமாக இருக்கலாம். ASHA அக்காவிடம் பேசுங்கள், அவர் PHC அல்லது அடுத்த உதவி பற்றி வழிகாட்டுவார்.",
      te: "ఈ సమస్య తీవ్రమై ఉండవచ్చు. ASHA అక్కతో మాట్లాడండి, ఆమె PHC లేదా తదుపరి సహాయం గురించి మార్గనిర్దేశం చేస్తారు.",
      ml: "ഈ ബുദ്ധിമുട്ട് ഗുരുതരമായിരിക്കാം. ASHA ചേച്ചിയോട് സംസാരിക്കൂ, അവർ PHC അല്ലെങ്കിൽ അടുത്ത സഹായത്തെക്കുറിച്ച് മാർഗ്ഗനിർദ്ദേശം നൽകും.",
    };

    return generalAshaAdvice[language] || generalAshaAdvice.mr;
  }

  return null;
}

async function responseAgent({
  userText,
  conversationContext,
  selectedLanguage,
  languageData,
  symptomData,
  riskData,
  triagePlan,
  gender,
}) {
  const actionAdvice = getActionAdvice(
    selectedLanguage,
    triagePlan,
    riskData,
    symptomData
  );

  if (actionAdvice) {
    return actionAdvice;
  }

  if (triagePlan?.mode === "ASK_SLOT" && triagePlan.nextSlot) {
    return await generateNaturalQuestion({
      slot: triagePlan.nextSlot,
      selectedLanguage,
      symptomData,
    });
  }

  if (triagePlan?.mode === "BASIC_ADVICE") {
    return getBasicAdvice(selectedLanguage, symptomData);
  }

  const responseLanguage = LANGUAGE_NAMES[selectedLanguage] || "Marathi";
  const responseScript = LANGUAGE_SCRIPTS[selectedLanguage] || "native script";

  const systemPrompt = `
You are Vaidya, a rural healthcare AI assistant.

Respond ONLY in ${responseLanguage}.
Write ONLY in ${responseScript}.
Do NOT use Roman transliteration.
Do NOT include English translation.
Use simple, respectful, rural-friendly language.
Keep the response SHORT: maximum 2 short sentences.
Do NOT diagnose disease.

TRIAGE MODE:
${triagePlan.mode}

TRUSTED RISK DATA:
${JSON.stringify(riskData, null, 2)}

Rules:
- Do not add English explanation or translation.
- If mode is ASHA_ADVICE, clearly tell the user to talk to an ASHA worker. Mention PHC guidance briefly.
- If mode is EMERGENCY_ACTION, tell the user to call 108 immediately.
- Do not add extra long explanation.
`;

  const userPrompt = `
Conversation so far:
${conversationContext}

Latest user message:
${userText}

User gender:
${gender || "not specified"}

Language data:
${JSON.stringify(languageData, null, 2)}

Symptom data:
${JSON.stringify(symptomData, null, 2)}

Generate the final short response now.
`;

  return await callGroq(systemPrompt, userPrompt);
}

function isAcknowledgement(text) {
  const msg = normalizeText(text);

  const acknowledgements = [
    "ok",
    "okay",
    "okk",
    "k",
    "thik",
    "thik hai",
    "thike",
    "theek",
    "theek hai",
    "tik hai",
    "tikhe",
    "ठीक है",
    "ठीक",
    "ठिक",
    "ठीक आहे",
    "बरं",
    "बरं आहे",
    "accha",
    "achha",
    "अच्छा",
    "thank you",
    "thanks",
    "धन्यवाद",
    "शुक्रिया",
    "got it",
    "समजलं",
    "samajla",
    "samajh gaya",
    "samajh gya",
    "समझ गया",
  ];

  return acknowledgements.includes(msg);
}

function acknowledgementReply(language) {
  const replies = {
    mr: "ठीक आहे. काळजी घ्या, आणि त्रास वाढला तर डॉक्टरांचा सल्ला घ्या.",
    hi: "ठीक है। ध्यान रखें, और तकलीफ बढ़े तो डॉक्टर से सलाह लें।",
    gu: "બરાબર. કાળજી રાખો, તકલીફ વધે તો ડૉક્ટરની સલાહ લો.",
    kn: "ಸರಿ. ಜಾಗ್ರತೆ ವಹಿಸಿ, ತೊಂದರೆ ಹೆಚ್ಚಾದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    ta: "சரி. கவனமாக இருங்கள், பிரச்சனை அதிகரித்தால் மருத்துவரிடம் ஆலோசனை பெறுங்கள்.",
    te: "సరే. జాగ్రత్తగా ఉండండి, సమస్య పెరిగితే వైద్యుడిని సంప్రదించండి.",
    ml: "ശരി. ശ്രദ്ധിക്കൂ, ബുദ്ധിമുട്ട് കൂടിയാൽ ഡോക്ടറുടെ ഉപദേശം തേടൂ.",
    bn: "ঠিক আছে। খেয়াল রাখুন, সমস্যা বাড়লে ডাক্তারের পরামর্শ নিন।",
    ur: "ٹھیک ہے۔ خیال رکھیں، تکلیف بڑھے تو ڈاکٹر سے مشورہ کریں۔",
  };

  return replies[language] || replies.mr;
}

function isAskingMoreAdvice(text) {
  const msg = normalizeText(text);

  const phrases = [
    "ajun ky upay",
    "ajun kay upay",
    "ajun kai upay",
    "ajun kya upay",
    "ajun kay karu",
    "ajun ky karu",
    "ajun kay karu shakte",
    "ajun ky karu shakte",
    "आणखी काय करू",
    "अजून काय करू",
    "अजून काय उपाय",
    "काय करू",
    "काय उपाय करू",
    "घरी काय करू",
    "kay karu",
    "kya karu",
    "what should i do",
    "what else",
    "more advice",
    "home remedy",
    "upay",
    "उपाय",
  ];

  return phrases.some((phrase) => msg.includes(phrase));
}

function moreAdviceReply(language, symptomData) {
  const symptomText = [
    symptomData?.mainSymptom,
    ...(symptomData?.interpretedSymptoms || []),
    symptomData?.possibleMeaning,
    symptomData?.adaptiveMeaning,
  ]
    .join(" ")
    .toLowerCase();

  const isFever =
    symptomText.includes("fever") ||
    symptomText.includes("ताप") ||
    symptomText.includes("बुखार") ||
    symptomText.includes("તાવ");

  const isHeadache =
    symptomText.includes("headache") ||
    symptomText.includes("डोके") ||
    symptomText.includes("सिर दर्द") ||
    symptomText.includes("माथा");

  const isStomachPain =
    symptomText.includes("stomach") ||
    symptomText.includes("abdominal") ||
    symptomText.includes("पोट") ||
    symptomText.includes("पेट");

  if (isFever) {
    const replies = {
      mr: "कोमट पाणी प्या, हलका आहार घ्या आणि शरीराला विश्रांती द्या. ताप वाढला किंवा टिकून राहिला तर डॉक्टरांचा सल्ला घ्या.",
      hi: "गुनगुना पानी पिएं, हल्का खाना खाएं और शरीर को आराम दें। बुखार बढ़े या बना रहे तो डॉक्टर से सलाह लें।",
      gu: "ગરમ પાણી પીવો, હળવો ખોરાક લો અને આરામ કરો. તાવ વધે અથવા ચાલુ રહે તો ડૉક્ટરની સલાહ લો.",
    };

    return replies[language] || replies.mr;
  }

  if (isHeadache) {
    const replies = {
      mr: "शांत ठिकाणी थोडा आराम करा, पाणी प्या आणि स्क्रीन किंवा तेज प्रकाशापासून थोडं दूर राहा. दुखणं वाढलं तर डॉक्टरांचा सल्ला घ्या.",
      hi: "शांत जगह पर थोड़ा आराम करें, पानी पिएं और स्क्रीन या तेज रोशनी से दूर रहें। दर्द बढ़े तो डॉक्टर से सलाह लें।",
      gu: "શાંત જગ્યાએ આરામ કરો, પાણી પીવો અને સ્ક્રીન અથવા તેજ પ્રકાશથી દૂર રહો. દુખાવો વધે તો ડૉક્ટરની સલાહ લો.",
    };

    return replies[language] || replies.mr;
  }

  if (isStomachPain) {
    const replies = {
      mr: "हलका आहार घ्या, पुरेसे पाणी प्या आणि जड किंवा तेलकट अन्न टाळा. पोटदुखी वाढली तर डॉक्टरांचा सल्ला घ्या.",
      hi: "हल्का खाना खाएं, पर्याप्त पानी पिएं और भारी या तेल वाला खाना टालें। पेट दर्द बढ़े तो डॉक्टर से सलाह लें।",
      gu: "હળવો ખોરાક લો, પૂરતું પાણી પીવો અને ભારે કે તેલવાળો ખોરાક ટાળો. પેટદુખાવો વધે તો ડૉક્ટરની સલાહ લો.",
    };

    return replies[language] || replies.mr;
  }

  const replies = {
    mr: "थोडा आराम करा, पुरेसे पाणी प्या आणि हलका आहार घ्या. त्रास वाढला किंवा कमी झाला नाही तर डॉक्टरांचा सल्ला घ्या.",
    hi: "थोड़ा आराम करें, पर्याप्त पानी पिएं और हल्का खाना खाएं। तकलीफ बढ़े या कम न हो तो डॉक्टर से सलाह लें।",
    gu: "થોડો આરામ કરો, પૂરતું પાણી પીવો અને હળવો ખોરાક લો. તકલીફ વધે અથવા ઓછી ન થાય તો ડૉક્ટરની સલાહ લો.",
  };

  return replies[language] || replies.mr;
}

async function runVaidyaAgents({ messages, gender, language }) {
  const latestUserMessage =
    messages?.filter((m) => m.role === "user")?.at(-1)?.content || "";

  const selectedLanguage = language || "mr";

  if (!latestUserMessage) {
    return {
      reply: "Please describe your symptoms.\n[SEVERITY:LOW]",
      agents: {
        languageData: {},
        adaptiveHints: [],
        symptomData: {},
        riskData: {
          severity: "LOW",
          needsASHA: false,
          needsEmergency: false,
          needsClarification: false,
        },
        severityData: {
          severity: "LOW",
          needsASHA: false,
          needsEmergency: false,
          needsClarification: false,
        },
        triagePlan: {
          mode: "ASK_SYMPTOM",
          displaySeverity: "LOW",
        },
      },
    };
  }

  if (isAcknowledgement(latestUserMessage)) {
    return {
      reply: `${acknowledgementReply(selectedLanguage)}\n[SEVERITY:LOW]`,
      agents: {
        languageData: {},
        adaptiveHints: [],
        symptomData: {
          mainSymptom: "acknowledgement",
        },
        riskData: {
          severity: "LOW",
          needsASHA: false,
          needsEmergency: false,
          needsClarification: false,
          reason: "User acknowledged the advice.",
        },
        severityData: {
          severity: "LOW",
          needsASHA: false,
          needsEmergency: false,
          needsClarification: false,
          reason: "User acknowledged the advice.",
        },
        triagePlan: {
          mode: "ACKNOWLEDGEMENT",
          displaySeverity: "LOW",
        },
      },
    };
  }

  if (isNegativeResponse(latestUserMessage)) {
    const conversationContext = messages
      .slice(-8)
      .map((m) => `${m.role}: ${cleanSeverityTag(m.content)}`)
      .join("\n");

    const languageData = await languageAgent(
      latestUserMessage,
      selectedLanguage
    );

    const adaptiveHints = getAdaptiveHints(latestUserMessage);

    const symptomData = await symptomAgent(
      conversationContext,
      languageData,
      adaptiveHints
    );

    return {
      reply: `${getBasicAdvice(selectedLanguage, symptomData)}\n[SEVERITY:LOW]`,
      agents: {
        languageData,
        adaptiveHints,
        symptomData,
        riskData: {
          severity: "LOW",
          needsASHA: false,
          needsEmergency: false,
          needsClarification: false,
          reason: "User denied warning symptoms.",
        },
        severityData: {
          severity: "LOW",
          needsASHA: false,
          needsEmergency: false,
          needsClarification: false,
          reason: "User denied warning symptoms.",
        },
        triagePlan: {
          mode: "NEGATIVE_WARNING_REPLY",
          displaySeverity: "LOW",
        },
      },
    };
  }

  if (isAskingMoreAdvice(latestUserMessage)) {
    const conversationContext = messages
      .slice(-8)
      .map((m) => `${m.role}: ${cleanSeverityTag(m.content)}`)
      .join("\n");

    const languageData = await languageAgent(
      latestUserMessage,
      selectedLanguage
    );

    const adaptiveHints = getAdaptiveHints(latestUserMessage);

    const symptomData = await symptomAgent(
      conversationContext,
      languageData,
      adaptiveHints
    );

    return {
      reply: `${moreAdviceReply(selectedLanguage, symptomData)}\n[SEVERITY:LOW]`,
      agents: {
        languageData,
        adaptiveHints,
        symptomData,
        riskData: {
          severity: "LOW",
          needsASHA: false,
          needsEmergency: false,
          needsClarification: false,
          reason: "User asked for additional home-care advice.",
        },
        severityData: {
          severity: "LOW",
          needsASHA: false,
          needsEmergency: false,
          needsClarification: false,
          reason: "User asked for additional home-care advice.",
        },
        triagePlan: {
          mode: "MORE_ADVICE",
          displaySeverity: "LOW",
        },
      },
    };
  }

  const conversationContext = messages
    .slice(-8)
    .map((m) => `${m.role}: ${cleanSeverityTag(m.content)}`)
    .join("\n");

  const userOnlyContext = messages
    .filter((m) => m.role === "user")
    .map((m) => cleanSeverityTag(m.content))
    .join("\n");

  const languageData = await languageAgent(latestUserMessage, selectedLanguage);

  const adaptiveHints = getAdaptiveHints(latestUserMessage);
  console.log("ADAPTIVE HINTS:", adaptiveHints);

  const symptomData = await symptomAgent(
    conversationContext,
    languageData,
    adaptiveHints
  );

  const riskData = applyRiskController(userOnlyContext, symptomData);

  const lastAssistantMessage = getLastAssistantMessage(messages);

  const triagePlan = buildTriagePlan(
    conversationContext,
    userOnlyContext,
    latestUserMessage,
    symptomData,
    riskData,
    lastAssistantMessage
  );

  console.log("SYMPTOM DATA:", symptomData);
  console.log("RISK DATA:", riskData);
  console.log("TRIAGE PLAN:", triagePlan);

  const rawReply = await responseAgent({
    userText: latestUserMessage,
    conversationContext,
    selectedLanguage,
    languageData,
    symptomData,
    riskData,
    triagePlan,
    gender,
  });

  const cleanReply = cleanSeverityTag(rawReply);

  const finalSeverity =
    triagePlan.displaySeverity || riskData.severity || "LOW";

  const reply = `${cleanReply}\n[SEVERITY:${finalSeverity}]`;

  return {
    reply,
    agents: {
      languageData,
      adaptiveHints,
      symptomData,
      riskData,
      severityData: riskData,
      triagePlan,
    },
  };
}

module.exports = {
  runVaidyaAgents,
};