import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;
if (!API_BASE) {
  throw new Error("VITE_API_URL is missing. Add it in Vercel Environment Variables.");
}

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async (messages, gender, language) => {
  const response = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      messages,
      gender,
      language,
      langCode: language
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  return data;
};

export const submitCorrection = async ({
  original_input,
  ai_interpretation,
  correct_meaning,
  dialect,
  language,
  severity,
  user_role = "patient",
}) => {
  const res = await api.post("/correct", {
    original_input,
    ai_interpretation,
    correct_meaning,
    dialect,
    language,
    severity,
    user_role,
  });

  return res.data;
};

export const fetchStats = async () => {
  const res = await api.get("/stats");
  return res.data;
};

export const fetchRecentCorrections = async () => {
  const res = await api.get("/corrections/recent");
  return res.data;
};

export const exportDataset = () => {
  window.open(`${API_BASE}/dataset/export`, "_blank");
};

export const speakText = async (text, langCode) => {
  const response = await fetch(`${API_BASE}/speak`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
      langCode
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`TTS failed: ${errorText}`);
  }

  return await response.blob();
};