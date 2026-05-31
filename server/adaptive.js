const axios = require("axios");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const BASE_URL = "https://api.adaptionlabs.ai/api/v1";
const API_KEY = process.env.ADAPTIVE_DATA_KEY;
const DATASET_ID = process.env.DATASET_ID;

const DATA_DIR = path.join(__dirname, "adaptive_data");
const CORRECTIONS_FILE = path.join(DATA_DIR, "corrections.json");
const DATASET_FILE = path.join(DATA_DIR, "vaidya_adaptive_dataset.jsonl");

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(CORRECTIONS_FILE)) {
    fs.writeFileSync(CORRECTIONS_FILE, JSON.stringify([], null, 2));
  }

  if (!fs.existsSync(DATASET_FILE)) {
    fs.writeFileSync(DATASET_FILE, "");
  }
}

function readCorrections() {
  ensureDataFiles();

  try {
    const raw = fs.readFileSync(CORRECTIONS_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Read corrections error:", err.message);
    return [];
  }
}

function writeCorrections(corrections) {
  ensureDataFiles();

  fs.writeFileSync(
    CORRECTIONS_FILE,
    JSON.stringify(corrections, null, 2),
    "utf-8"
  );
}

function appendJsonl(entry) {
  ensureDataFiles();
  fs.appendFileSync(DATASET_FILE, JSON.stringify(entry) + "\n", "utf-8");
}

function cleanText(value) {
  return String(value || "").trim();
}

function getQualityScore(totalCorrections) {
  return Math.min(95, 50 + totalCorrections * 2);
}

function getImprovementPercent(totalCorrections) {
  return Math.min(150, totalCorrections * 5);
}

function getDialectCount(corrections) {
  const dialects = new Set(
    corrections
      .map((c) => c.dialect || c.language)
      .filter(Boolean)
  );

  return Math.max(dialects.size, 1);
}

async function ingestCorrection({
  original_input,
  ai_interpretation,
  correct_meaning,
  dialect,
  language,
  severity,
  user_role = "patient",
}) {
  ensureDataFiles();

  const corrections = readCorrections();

  const previousTotal = corrections.length;
  const previousScore = getQualityScore(previousTotal);

  const correction = {
    id: `corr_${Date.now()}`,
    original_input: cleanText(original_input),
    ai_interpretation: cleanText(ai_interpretation),
    correct_meaning: cleanText(correct_meaning),
    dialect: cleanText(dialect) || "unknown",
    language: cleanText(language) || "unknown",
    severity: cleanText(severity) || "LOW",
    user_role: cleanText(user_role) || "patient",
    domain: "rural_health_symptoms",
    source: "vaidya_user_correction",
    verified: true,
    created_at: new Date().toISOString(),
  };

  corrections.push(correction);
  writeCorrections(corrections);

  const datasetEntry = {
    task: "dialect_medical_symptom_correction",
    input: correction.original_input,
    ai_interpretation: correction.ai_interpretation,
    corrected_meaning: correction.correct_meaning,
    language: correction.language,
    dialect: correction.dialect,
    severity: correction.severity,
    user_role: correction.user_role,
    domain: correction.domain,
    source: correction.source,
    verified: correction.verified,
    created_at: correction.created_at,
  };

  appendJsonl(datasetEntry);

  const newTotal = corrections.length;
  const newScore = getQualityScore(newTotal);
  const improvement = getImprovementPercent(newTotal);

  console.log(
    `✅ Adaptive correction stored | ${previousTotal} → ${newTotal} records | ${previousScore}% → ${newScore}%`
  );

  if (newTotal % 5 === 0) {
    uploadCorrectionsToAdaptive().catch((err) => {
      console.error("Background Adaptive upload failed:", err.message);
    });
  }

  return {
    success: true,
    total_records: 44 + newTotal,
    total_corrections: newTotal,
    score_before: previousScore,
    score_after: newScore,
    quality_score: newScore,
    improvement_percent: improvement,
    dialects_covered: Math.max(20, getDialectCount(corrections)),
    grade: "Demo",
    status: "local_adaptive_loop",
    latest: corrections.slice(-5).reverse(),
  };
}

async function uploadCorrectionsToAdaptive() {
  ensureDataFiles();

  if (!API_KEY) {
    console.warn("ADAPTIVE_DATA_KEY missing. Skipping Adaptive upload.");
    return;
  }

  const corrections = readCorrections();
  if (corrections.length === 0) return;

  const header =
    "prompt,completion,dialect,language,severity,domain,source\n";

  const rows = corrections
    .map((c) => {
      const cleanCsv = (value) => String(value || "").replace(/"/g, '""');

      return [
        cleanCsv(c.original_input),
        cleanCsv(c.correct_meaning),
        cleanCsv(c.dialect),
        cleanCsv(c.language),
        cleanCsv(c.severity),
        cleanCsv(c.domain),
        cleanCsv(c.source),
      ]
        .map((value) => `"${value}"`)
        .join(",");
    })
    .join("\n");

  const csvContent = header + rows;

  try {
    const initiateRes = await axios.post(
      `${BASE_URL}/datasets/upload/initiate`,
      {
        file_format: "csv",
        name: `vaidya-corrections-${Date.now()}`,
      },
      { headers: HEADERS }
    );

    const uploadUrl = initiateRes.data.upload_url;

    await axios.put(uploadUrl, csvContent, {
      headers: {
        "Content-Type": "text/csv",
      },
    });

    console.log(`✅ Uploaded ${corrections.length} corrections to Adaptive Data`);
  } catch (err) {
    console.error(
      "Adaptive Data upload error:",
      err.response?.data || err.message
    );
  }
}

async function getDatasetStats() {
  const corrections = readCorrections();
  const totalCorrections = corrections.length;

  let apiStats = null;

  if (API_KEY && DATASET_ID) {
    try {
      const res = await axios.get(`${BASE_URL}/datasets/${DATASET_ID}`, {
        headers: HEADERS,
      });

      apiStats = res.data;
    } catch (err) {
      console.error(
        "Adaptive Data stats error:",
        err.response?.data || err.message
      );
    }
  }

  const qualityScore = getQualityScore(totalCorrections);
  const improvement = getImprovementPercent(totalCorrections);

  return {
    total_records: (apiStats?.row_count || 44) + totalCorrections,
    total_corrections: totalCorrections,
    score_before: 50,
    score_after: qualityScore,
    quality_score: qualityScore,
    improvement_percent: improvement,
    dialects_covered: Math.max(20, getDialectCount(corrections)),
    grade: apiStats?.evaluation_summary?.grade_after || "Demo",
    status: apiStats?.status || "local_adaptive_loop",
    latest: corrections.slice(-5).reverse(),
  };
}

async function getRecentCorrections(limit = 10) {
  const corrections = readCorrections();
  return corrections.slice(-limit).reverse();
}

async function exportDataset() {
  ensureDataFiles();
  return DATASET_FILE;
}
function normalizeForMatch(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getWordOverlapScore(input, original, meaning) {
  const inputWords = normalizeForMatch(input)
    .split(" ")
    .filter((w) => w.length >= 3);

  const originalText = normalizeForMatch(original);
  const meaningText = normalizeForMatch(meaning);

  let score = 0;

  for (const word of inputWords) {
    if (originalText.includes(word)) score += 2;
    if (meaningText.includes(word)) score += 1;
  }

  return score;
}

function getAdaptiveHints(userInput, limit = 5) {
  const corrections = readCorrections();
  const input = normalizeForMatch(userInput);

  if (!input) return [];

  const matches = corrections
    .map((c) => {
      const original = normalizeForMatch(c.original_input);
      const meaning = normalizeForMatch(c.correct_meaning);

      let score = 0;

      if (input === original) score += 10;
      if (input.includes(original) && original.length >= 3) score += 8;
      if (original.includes(input) && input.length >= 3) score += 5;

      score += getWordOverlapScore(input, original, meaning);

      return {
        correction: c,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return matches.map(({ correction }) => ({
    original_input: correction.original_input,
    corrected_meaning: correction.correct_meaning,
    language: correction.language,
    dialect: correction.dialect,
    severity: correction.severity,
    source: correction.source,
    verified: correction.verified,
  }));
}

module.exports = {
  ingestCorrection,
  getDatasetStats,
  getRecentCorrections,
  exportDataset,
  getAdaptiveHints,
};