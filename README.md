# वैद्या — तुमची आरोग्य साथी

AI health triage assistant for rural Maharashtra that understands dialectal Marathi
and continuously improves through user corrections via Adaptive Data.

---

## Setup

### 1. Server
cd server
npm install

Fill in .env:
  ANTHROPIC_API_KEY=
  ADAPTIVE_DATA_KEY=
  DATASET_ID=

npm run dev

### 2. Client
cd client
npm install
npm run dev

App runs at http://localhost:3000
Server runs at http://localhost:5000

---

## File structure

server/
  index.js       Express server, 3 routes: /chat /correct /stats
  claude.js      Claude API + Marathi system prompt
  adaptive.js    Adaptive Data ingestion + stats

client/src/
  api/index.js            Axios calls to backend
  hooks/useChat.js        Chat state + message history
  hooks/useAdaptive.js    Correction submission + stats polling
  components/
    ChatWindow.jsx        Main chat UI
    MessageBubble.jsx     Single message + correction trigger
    CorrectionPanel.jsx   Correction form + dialect selector
    DatasetStats.jsx      Live dataset quality dashboard
    VoiceInput.jsx        Marathi voice input (mr-IN)

---

## Demo flow (practice this)

1. User types/speaks symptom in Vidarbha dialect
2. Vaidya responds in simple Marathi
3. AI misunderstands a dialectal word
4. User clicks "हे चुकीचे आहे"
5. User fills correction + selects dialect
6. Stats bar updates live — correction count goes up
7. Ask same question — Vaidya now gets it right

