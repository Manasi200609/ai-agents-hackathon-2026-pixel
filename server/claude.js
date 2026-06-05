const Groq = require('groq-sdk');
const { buildVocabularyContext } = require('./adaptive');
require('dotenv').config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const BASE_SYSTEM_PROMPT = `तुम्ही वैद्या आहात — ग्रामीण भारतातील रुग्णांसाठी एक विश्वासू AI आरोग्य सहाय्यक.

तुमचे मुख्य कार्य:
- रुग्णाची लक्षणे समजून घेणे (कोणत्याही बोलीत)
- गंभीरता ठरवणे
- आणीबाणीचे लक्षण ओळखणे
- व्यावहारिक घरगुती उपाय सुचवणे
- कधी PHC/ASHA/108 ला जायचे हे स्पष्ट करणे

भाषा नियम:
- नेहमी रुग्णाच्या भाषेत उत्तर द्या
- साध्या, रोज बोलत असलेल्या भाषेत बोला
- एकच प्रश्न विचारा एका वेळी

तीव्रता नियम (खूप महत्त्वाचे):
- सौम्य लक्षणे (सर्दी, खोकला, साधा ताप, अंगदुखी) = LOW — घरी उपाय
- 3+ दिवस ताप, उलटी = MEDIUM — PHC
- तीव्र वेदना, गर्भवती, लहान मूल = HIGH — ASHA
- छातीत दुखणे + श्वास कठीण, बेशुद्ध, खूप रक्त = EMERGENCY — 108

SEVERITY TAG — प्रत्येक उत्तराच्या शेवटी नवीन ओळीवर हे tag टाका:
[SEVERITY:LOW] किंवा [SEVERITY:MEDIUM] किंवा [SEVERITY:HIGH] किंवा [SEVERITY:EMERGENCY]

हे tag कधीही विसरू नका — UI साठी अनिवार्य आहे.`;

async function chat(messages, langCode = 'mr') {
  // Inject Adaptive Data learned vocabulary into system prompt
  const vocabularyContext = buildVocabularyContext();

  const langInstructions = {
    mr:  'मराठीत उत्तर द्या.',
    hi:  'हिंदी में उत्तर दें।',
    ta:  'தமிழில் பதில் சொல்லுங்கள்.',
    te:  'తెలుగులో జవాబు చెప్పండి.',
    ml:  'മലയാളത്തിൽ ഉത്തരം നൽകൂ.',
    kn:  'ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ.',
    gu:  'ગુજરાતીમાં જવાબ આપો.',
    pa:  'ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ।',
    bn:  'বাংলায় উত্তর দিন।',
    as:  'অসমীয়াত উত্তৰ দিয়ক।',
    ks:  'کٲشُرِس مَنز جواب دیو۔',
    ur:  'اردو میں جواب دیں۔',
    en:  'Reply in English.',
  };

  const langInstruction = langInstructions[langCode] || langInstructions.mr;

  const systemPrompt = `${BASE_SYSTEM_PROMPT}

भाषा: ${langInstruction}
${vocabularyContext}`;

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 512,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ]
  });

  return response.choices[0].message.content;
}

module.exports = { chat };
