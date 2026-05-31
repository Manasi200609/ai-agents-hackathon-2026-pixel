import { useState, useEffect, useRef } from 'react';
import { useAdaptive } from '../hooks/useAdaptive';
import { useLanguage } from '../context/LanguageContext';

export default function DatasetStats() {
  const { stats, lastCorrection } = useAdaptive();
  const { ui } = useLanguage();
  const [updated, setUpdated] = useState({});
  const [showImprovement, setShowImprovement] = useState(false);
  const prevStats = useRef(stats);

  useEffect(() => {
    const changed = {};
    if (stats.total_records !== prevStats.current.total_records) changed.total_records = true;
    if (stats.score_after !== prevStats.current.score_after) changed.score_after = true;
    if (stats.improvement_percent !== prevStats.current.improvement_percent) changed.improvement_percent = true;

    if (Object.keys(changed).length > 0) {
      setUpdated(changed);
      setTimeout(() => setUpdated({}), 800);
    }
    prevStats.current = stats;
  }, [stats]);

  useEffect(() => {
    if (lastCorrection) {
      setShowImprovement(true);
      setTimeout(() => setShowImprovement(false), 4000);
    }
  }, [lastCorrection]);

  return (
    <>
      <div className="stats-bar">
        <div className="stat">
          <span className={`stat-value ${updated.total_records ? 'updated' : ''}`}>
            {stats.total_records}
          </span>
          <span className="stat-label">{ui?.corrections || 'सुधारणा'}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className={`stat-value ${updated.score_after ? 'updated' : ''}`}>
            {stats.score_after}%
          </span>
          <span className="stat-label">{ui?.quality || 'गुणवत्ता'}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className={`stat-value ${updated.improvement_percent ? 'updated' : ''}`}
            style={{ color: stats.improvement_percent > 0 ? '#4ab8a0' : 'var(--accent)' }}>
            +{stats.improvement_percent}%
          </span>
          <span className="stat-label">सुधार</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value" style={{ fontSize: '14px' }}>
            {stats.dialects_covered}
          </span>
          <span className="stat-label">{ui?.dialects || 'भाषा'}</span>
        </div>
      </div>

      {/* Score improvement banner — shows after correction */}
      {showImprovement && lastCorrection && (
        <div className="improvement-banner">
          <span className="improvement-label">Adaptive Data</span>
          <span className="improvement-flow">
            <span className="score-before">{lastCorrection.score_before}%</span>
            <span className="score-arrow"> → </span>
            <span className="score-after">{lastCorrection.score_after}%</span>
          </span>
          <span className="improvement-badge">+{lastCorrection.improvement_percent}% सुधार 🎯</span>
        </div>
      )}
    </>
  );
}