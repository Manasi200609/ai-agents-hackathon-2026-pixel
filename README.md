# 🩺 वैद्या — तुमची आरोग्य साथी

> An adaptive rural healthcare assistant that understands local dialects, performs AI-powered symptom triage, and continuously improves from community feedback.

---

## 🌾 Problem

Millions of rural Indians describe symptoms using local dialects, regional vocabulary, and informal expressions.

Examples:

* "डोळे जड झाले"
* "जीव घाबरतोय"
* "अंग मोडतंय"
* "पोटात गोळे येतायत"

Most healthcare AI systems are trained on formal medical language and often fail to understand these expressions correctly.

This creates a critical gap in healthcare accessibility, especially in regions with limited medical infrastructure.

---

## 💡 Solution

**Vaidya** is a rural-first AI healthcare assistant designed to understand symptom descriptions expressed in local dialects and natural speech.

The system:

✅ Understands dialectal symptom descriptions

✅ Communicates in the user's preferred language

✅ Performs AI-assisted severity assessment

✅ Escalates concerning cases

✅ Learns continuously from user corrections

✅ Builds a growing dialect-aware healthcare dataset

---

## 🚀 Key Features

### 🗣️ Multilingual Conversations

Supports healthcare conversations in regional languages and dialects.

Current implementation includes:

* Marathi
* Hindi
* Assamese
* Kashmiri

Architecture supports additional languages.

---

### 🧠 AI-Powered Symptom Triage

The assistant:

* Understands symptoms
* Asks follow-up questions
* Estimates severity
* Provides basic healthcare guidance

Severity Levels:

* LOW
* MEDIUM
* HIGH
* EMERGENCY

---

### 📈 Adaptive Learning Pipeline

Vaidya continuously improves through feedback.

When users indicate:

> "हे चुकीचे आहे"

the correction is captured and added to the adaptive learning pipeline.

This enables the system to:

* Learn new dialect expressions
* Improve symptom interpretation
* Expand regional healthcare vocabulary
* Reduce future misunderstandings

---

### 👩‍⚕️ ASHA Worker Escalation

For cases requiring additional support:

* Users can connect with healthcare workers
* Future versions will support live teleconsultation workflows

---

### 🎤 Voice-Based Interaction

Users can:

* Speak symptoms directly
* Use regional language input
* Receive spoken responses

Designed for users with limited typing ability.

---

### 📚 Conversation History

All healthcare conversations are securely stored.

Users can:

* Review previous interactions
* Track recurring symptoms
* Access past guidance

---

### 🔐 Authentication

Google Authentication is integrated using Firebase.

Features:

* Secure login
* Persistent user profiles
* Personalized history tracking

---

### 📱 Progressive Web App (PWA)

Vaidya can be installed like a mobile application.

Benefits:

* Home-screen installation
* Faster loading
* Offline-ready architecture
* Rural-friendly deployment

---

## 🏗️ System Architecture

User

↓

Vaidya Frontend (React + Vite)

↓

AI Triage Engine

↓

Severity Classification

↓

Adaptive Learning Pipeline

↓

Firestore History Storage

↓

Future Doctor / ASHA Escalation Layer

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* CSS
* Web Speech API

### Backend

* Node.js
* Express.js

### AI

* Google Gemini
* Adaptive Learning Pipeline

### Database

* Firebase Firestore

### Authentication

* Firebase Authentication

### Deployment

* Progressive Web App (PWA)

---

## 📂 Project Structure

```text
client/
 ├── src/
 │   ├── components/
 │   ├── screens/
 │   ├── hooks/
 │   ├── context/
 │   ├── api/
 │   └── assets/

server/
 ├── adaptive_data/
 ├── index.js
 ├── agents.js
 ├── adaptive.js
 ├── severity.js
 └── claude.js
```

## ⚙️ Local Setup

### Server

```bash
cd server
npm install
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

Client:

```text
http://localhost:3000
```

Server:

```text
http://localhost:5000
```

## 🎯 Demo Flow

1. User describes a symptom using a regional dialect.

2. Vaidya interprets the symptom.

3. AI asks relevant follow-up questions.

4. Severity is classified.

5. Guidance is provided.

6. User can submit corrections.

7. Adaptive learning updates the dataset.

8. Future interactions become more accurate.

---

## 🔮 Future Enhancements

### 📍 Nearby Doctor Discovery

When severity indicates medical attention is required:

* Detect user location
* Show nearby doctors
* Display ratings
* Show contact information
* Enable direct calling

---

### 🏥 Healthcare Network Integration

* Clinics
* PHCs
* Hospitals
* ASHA workers

---

### 🌐 Expanded Dialect Coverage

Support for additional Indian languages and regional dialects.

---

## 🤝 Acknowledgements

Built for **AI Agents Hackathon 2026**.

Technologies and platforms used:

* Google Gemini
* Firebase
* React
* Vite

### ## 🧬 Adaption Labs Integration

One of the core challenges Vaidya addresses is the lack of healthcare AI systems that understand how people actually describe symptoms in rural and regional communities.

Traditional models often struggle with:

* Dialect-specific vocabulary
* Informal symptom descriptions
* Region-dependent meanings
* Continuously evolving local language usage

To address this challenge, Vaidya incorporates an adaptive learning workflow powered through Adaption Labs.

When the system misinterprets a symptom or dialect expression, users can submit corrections directly through the application. These corrections are captured, structured, and routed into the adaptation pipeline, enabling the system to continuously improve its understanding of real-world healthcare conversations.

This adaptive feedback loop allows Vaidya to:

* Learn new dialect expressions over time
* Improve symptom interpretation accuracy
* Expand its rural healthcare vocabulary
* Reduce repeated misunderstandings
* Build a continuously evolving healthcare language dataset

The integration of Adaption Labs transforms Vaidya from a static healthcare chatbot into a continuously learning healthcare assistant that becomes more effective with every interaction.

### Adaptive Learning Flow

User Symptom
↓
AI Interpretation
↓
User Correction
↓
Adaption Labs Pipeline
↓
Dataset Improvement
↓
Improved Future Responses

This adaptive capability forms the foundation of Vaidya's long-term vision: creating a healthcare assistant that understands the language of every village, every dialect, and every community.


---

## Team Pixel

Building accessible healthcare technology for every village, every dialect, and every voice.
