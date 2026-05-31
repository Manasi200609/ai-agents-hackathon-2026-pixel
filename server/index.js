const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { runVaidyaAgents } = require("./agents");

const {
  ingestCorrection,
  getDatasetStats,
  getRecentCorrections,
  exportDataset,
} = require("./adaptive");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Vaidya backend is running",
  });
});

// ─── Chat Route ─────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, gender, language, langCode } = req.body;

    const selectedLanguage = language || langCode || "mr";

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "messages array is required",
      });
    }

    const result = await runVaidyaAgents({
      messages,
      gender,
      language: selectedLanguage,
    });

    return res.json({
      reply: result.reply,
      agents: result.agents,
    });
  } catch (err) {
    console.error("Chat error:", err.message);
    console.error(err.stack);

    return res.status(500).json({
      error: "Vaidya multi-agent pipeline failed",
      details: err.message,
    });
  }
});

// ─── Correction Route ───────────────────────────────
app.post("/api/correct", async (req, res) => {
  try {
    const {
      original_input,
      ai_interpretation,
      correct_meaning,
      dialect,
      language,
      severity,
      user_role,
    } = req.body;

    if (!original_input || !correct_meaning) {
      return res.status(400).json({
        error: "original_input and correct_meaning are required",
      });
    }

    const stats = await ingestCorrection({
      original_input,
      ai_interpretation,
      correct_meaning,
      dialect,
      language,
      severity,
      user_role: user_role || "patient",
    });

    return res.json({
      success: true,
      message: "Correction stored successfully",
      stats,
    });
  } catch (err) {
    console.error("Correction error:", err.message);

    return res.status(500).json({
      error: "Adaptive Data error",
      details: err.message,
    });
  }
});

// ─── Stats Route ────────────────────────────────────
app.get("/api/stats", async (req, res) => {
  try {
    const stats = await getDatasetStats();
    return res.json(stats);
  } catch (err) {
    console.error("Stats error:", err.message);

    return res.status(500).json({
      error: "Stats error",
      details: err.message,
    });
  }
});

// ─── Recent Corrections Route ───────────────────────
app.get("/api/corrections/recent", async (req, res) => {
  try {
    const recent = await getRecentCorrections(10);

    return res.json({
      success: true,
      corrections: recent,
    });
  } catch (err) {
    console.error("Recent corrections error:", err.message);

    return res.status(500).json({
      error: "Recent corrections error",
      details: err.message,
    });
  }
});

// ─── Dataset Export Route ───────────────────────────
app.get("/api/dataset/export", async (req, res) => {
  try {
    const filePath = await exportDataset();

    return res.download(filePath, "vaidya_adaptive_dataset.jsonl");
  } catch (err) {
    console.error("Dataset export error:", err.message);

    return res.status(500).json({
      error: "Dataset export error",
      details: err.message,
    });
  }
});

// ─── Sarvam TTS Route ───────────────────────────────
app.post("/api/speak", async (req, res) => {
  try {
    const { text, langCode, languageCode } = req.body;

    if (!text || !String(text).trim()) {
      return res.status(400).json({
        error: "TTS failed",
        details: "text is required",
      });
    }

    if (!process.env.SARVAM_API_KEY) {
      return res.status(500).json({
        error: "TTS failed",
        details: "SARVAM_API_KEY is missing in server .env",
      });
    }

    const rawLang = languageCode || langCode || "mr";

    const normalizedLang = String(rawLang)
      .replace("-IN", "")
      .toLowerCase()
      .trim();

    const speakerMap = {
      mr: { lang: "mr-IN", speaker: "ishita" },
      hi: { lang: "hi-IN", speaker: "priya" },
      gu: { lang: "gu-IN", speaker: "neha" },
      ta: { lang: "ta-IN", speaker: "kavya" },
      te: { lang: "te-IN", speaker: "shruti" },
      kn: { lang: "kn-IN", speaker: "roopa" },
      ml: { lang: "ml-IN", speaker: "suhani" },
      bn: { lang: "bn-IN", speaker: "ishita" },
      pa: { lang: "pa-IN", speaker: "simran" },
      as: { lang: "as-IN", speaker: "ishita" },

      // Sarvam may not support Kashmiri directly, so fallback to Urdu voice.
      ks: { lang: "ur-IN", speaker: "ishita" },
      ur: { lang: "ur-IN", speaker: "ishita" },

      // Safe fallbacks
      or: { lang: "hi-IN", speaker: "priya" },
      mai: { lang: "hi-IN", speaker: "priya" },
      ne: { lang: "hi-IN", speaker: "priya" },
      doi: { lang: "hi-IN", speaker: "priya" },
      kok: { lang: "mr-IN", speaker: "ishita" },
      sa: { lang: "hi-IN", speaker: "priya" },
    };

    const voice = speakerMap[normalizedLang] || speakerMap.mr;

    const cleanText = String(text)
      .replace(/\[SEVERITY:(LOW|MEDIUM|HIGH|EMERGENCY)\]/gi, "")
      .replace(/\*/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 450);

    if (!cleanText) {
      return res.status(400).json({
        error: "TTS failed",
        details: "clean text is empty",
      });
    }

    console.log("🔊 Sarvam TTS request:", {
      rawLang,
      normalizedLang,
      target_language_code: voice.lang,
      speaker: voice.speaker,
      text: cleanText,
    });

    const response = await axios.post(
      "https://api.sarvam.ai/text-to-speech/stream",
      {
        text: cleanText,
        target_language_code: voice.lang,
        speaker: voice.speaker,
        model: "bulbul:v3",
        pace: 1.0,
        speech_sample_rate: 22050,
        output_audio_codec: "mp3",
        enable_preprocessing: true,
      },
      {
        headers: {
          "api-subscription-key": process.env.SARVAM_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    res.setHeader("Content-Type", "audio/mpeg");
    return res.send(Buffer.from(response.data));
  } catch (err) {
    const sarvamDetails = err.response?.data
      ? Buffer.from(err.response.data).toString()
      : err.message;

    console.error("❌ Sarvam TTS error:", sarvamDetails);

    return res.status(500).json({
      error: "TTS failed",
      details: sarvamDetails,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Vaidya server running on port ${PORT}`);
  console.log(
    "Routes: /api/chat | /api/correct | /api/stats | /api/corrections/recent | /api/dataset/export | /api/speak"
  );
});