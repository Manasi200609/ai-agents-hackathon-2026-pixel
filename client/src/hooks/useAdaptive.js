import { useState, useEffect } from "react";
import {
  submitCorrection,
  fetchStats,
  fetchRecentCorrections,
} from "../api/index";

export function useAdaptive() {
  const [stats, setStats] = useState({
    total_records: 44,
    total_corrections: 0,
    score_before: 50,
    score_after: 50,
    quality_score: 50,
    improvement_percent: 0,
    dialects_covered: 20,
    grade: "Demo",
    status: "local_adaptive_loop",
    latest: [],
  });

  const [recentCorrections, setRecentCorrections] = useState([]);
  const [correcting, setCorrecting] = useState(false);
  const [correctionSuccess, setCorrectionSuccess] = useState(false);
  const [lastCorrection, setLastCorrection] = useState(null);

  useEffect(() => {
    loadStats();
    loadRecentCorrections();

    const interval = setInterval(() => {
      loadStats();
      loadRecentCorrections();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  function normalizeStats(data) {
    return {
      total_records: data.total_records ?? 44,
      total_corrections: data.total_corrections ?? 0,
      score_before: data.score_before ?? 50,
      score_after: data.score_after ?? data.quality_score ?? 50,
      quality_score: data.quality_score ?? data.score_after ?? 50,
      improvement_percent: data.improvement_percent ?? 0,
      dialects_covered: data.dialects_covered ?? 20,
      grade: data.grade ?? "Demo",
      status: data.status ?? "local_adaptive_loop",
      latest: data.latest ?? [],
    };
  }

  async function loadStats() {
    try {
      const data = await fetchStats();
      setStats(normalizeStats(data));
    } catch (err) {
      console.error("Stats fetch failed:", err.message);
    }
  }

  async function loadRecentCorrections() {
    try {
      const data = await fetchRecentCorrections();
      setRecentCorrections(data.corrections || []);
    } catch (err) {
      console.error("Recent corrections fetch failed:", err.message);
    }
  }

  async function correct({
    original_input,
    ai_interpretation,
    correct_meaning,
    dialect,
    language,
    severity,
    user_role = "patient",
  }) {
    setCorrecting(true);
    setCorrectionSuccess(false);

    try {
      const result = await submitCorrection({
        original_input,
        ai_interpretation,
        correct_meaning,
        dialect,
        language,
        severity,
        user_role,
      });

      if (result.stats) {
        const newStats = normalizeStats(result.stats);
        setStats(newStats);

        setLastCorrection({
          score_before: result.stats.score_before ?? stats.score_after,
          score_after: result.stats.score_after ?? newStats.score_after,
          improvement_percent:
            result.stats.improvement_percent ?? newStats.improvement_percent,
        });
      }

      await loadRecentCorrections();

      setCorrectionSuccess(true);

      setTimeout(() => {
        setCorrectionSuccess(false);
        setLastCorrection(null);
      }, 4000);

      return result;
    } catch (err) {
      console.error("Correction failed:", err.message);
      throw err;
    } finally {
      setCorrecting(false);
    }
  }

  return {
    stats,
    recentCorrections,
    correcting,
    correctionSuccess,
    lastCorrection,
    correct,
    loadStats,
    loadRecentCorrections,
  };
}