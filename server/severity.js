// Strict keyword-based severity detection
// This runs AFTER the AI responds to validate severity

const EMERGENCY_KEYWORDS = [
  // English
  'chest pain', 'cannot breathe', 'unconscious', 'unresponsive', 'heavy bleeding',
  'stroke', 'heart attack', 'not breathing', 'stopped breathing',
  // Marathi
  'छातीत खूप दुखतंय', 'श्वास घेणे कठीण', 'बेशुद्ध', 'खूप रक्त येतंय',
  'श्वास बंद', 'हृदयविकार', 'पक्षाघात', 'तातडीने 108',
  // Hindi  
  'सांस नहीं आ रही', 'बेहोश', 'बहुत खून', 'सीने में दर्द और सांस',
  // Tamil
  'மூச்சு விட முடியவில்லை', 'மயக்கம்', 'அதிக இரத்தம்',
  // Telugu
  'శ్వాస తీసుకోలేకపోతున్నాను', 'స్పృహ తప్పింది',
  // Malayalam
  'ശ്വസിക്കാൻ കഴിയുന്നില്ല', 'ബോധം നഷ്ടമായി',
];

const HIGH_KEYWORDS = [
  // Marathi
  'खूप जास्त ताप', 'फेफरे', 'गर्भवती', 'प्रसूती', 'जखम खोल',
  'सतत उलटी', 'पाणी पिता येत नाही', 'लहान मूल आजारी',
  // Hindi
  'बहुत तेज बुखार', 'दौरा', 'गर्भवती', 'प्रसव', 'लगातार उल्टी',
  // English
  'very high fever', 'seizure', 'pregnant', 'labor', 'cannot keep water',
  'child sick', 'infant sick', 'baby sick',
  // Tamil
  'வலிப்பு', 'கர்ப்பிணி', 'குழந்தை நோய்வாய்ப்பட்டது',
  // Telugu
  'మూర్ఛ', 'గర్భిణీ', 'పసిపాప జబ్బు',
];

const MEDIUM_KEYWORDS = [
  // Marathi  
  '3 दिवस', 'तीन दिवस', '४ दिवस', 'चार दिवस', '5 दिवस', 'पाच दिवस',
  'कमी होत नाही', 'PHC', 'दवाखाना', 'डॉक्टर',
  // Hindi
  '3 दिन', 'तीन दिन', 'कम नहीं हो रहा', 'डॉक्टर के पास',
  // English
  '3 days', 'three days', 'not getting better', 'not improving', 'see doctor',
];

// LOW symptoms — these should NEVER escalate beyond LOW
const DEFINITELY_LOW = [
  // Marathi
  'अंग मोडतंय', 'डोळे जड', 'थोडा ताप', 'सर्दी', 'खोकला', 'अंगदुखी',
  'डोकेदुखी', 'थकवा', 'पोटात गॅस', 'मळमळ', 'भूक नाही',
  // Hindi
  'थोड़ा बुखार', 'सर्दी', 'खांसी', 'थकान', 'सिर दर्द', 'पेट में गैस',
  // English
  'mild fever', 'cold', 'cough', 'tired', 'headache', 'gas', 'nausea',
  'body ache', 'fatigue', 'runny nose', 'sore throat',
  // Tamil
  'சாதாரண காய்ச்சல்', 'சளி', 'இருமல்', 'தலைவலி',
  // Telugu
  'మామూలు జ్వరం', 'జలుబు', 'దగ్గు', 'తలనొప్పి',
  // Malayalam
  'സാധാരണ പനി', 'ജലദോഷം', 'ചുമ', 'തലവേദന',
];

function detectSeverity(userMessage, aiResponse, conversationLength) {
  const combined = (userMessage + ' ' + aiResponse).toLowerCase();
  const userLower = userMessage.toLowerCase();

  // Check if it's definitely a LOW symptom first
  for (const keyword of DEFINITELY_LOW) {
    if (userLower.includes(keyword.toLowerCase())) {
      // Only LOW unless conversation is long and symptoms persist
      if (conversationLength < 4) {
        return 'LOW';
      }
    }
  }

  // Check EMERGENCY
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (combined.includes(keyword.toLowerCase())) {
      return 'EMERGENCY';
    }
  }

  // Check HIGH
  for (const keyword of HIGH_KEYWORDS) {
    if (combined.includes(keyword.toLowerCase())) {
      return 'HIGH';
    }
  }

  // Check MEDIUM
  for (const keyword of MEDIUM_KEYWORDS) {
    if (combined.includes(keyword.toLowerCase())) {
      return 'MEDIUM';
    }
  }

  // Default — first few messages are almost always LOW
  if (conversationLength <= 2) return 'LOW';

  return 'LOW';
}

module.exports = { detectSeverity };