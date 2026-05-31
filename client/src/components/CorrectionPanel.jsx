import { useState } from "react";
import { useAdaptive } from "../hooks/useAdaptive";
import { useLanguage } from "../context/LanguageContext";

const DIALECTS = [
  { value: "vidarbha", label: "विदर्भ" },
  { value: "marathwada", label: "मराठवाडा" },
  { value: "konkan", label: "कोकण" },
  { value: "pune", label: "पुणे / पश्चिम महाराष्ट्र" },
  { value: "varhad", label: "वऱ्हाड" },
  { value: "rural", label: "ग्रामीण / स्थानिक बोली" },
  { value: "other", label: "इतर" },
];

export default function CorrectionPanel({
  aiResponse,
  userInput,
  severity = "LOW",
  onClose,
}) {
  const { correct, correcting, correctionSuccess } = useAdaptive();
  const { langCode } = useLanguage();

  const [correctMeaning, setCorrectMeaning] = useState("");
  const [dialect, setDialect] = useState("");

  async function handleSubmit() {
    if (!correctMeaning.trim() || !dialect) return;

    await correct({
      original_input: userInput,
      ai_interpretation: aiResponse,
      correct_meaning: correctMeaning,
      dialect,
      language: langCode,
      severity,
      user_role: "patient",
    });

    setTimeout(onClose, 3000);
  }

  if (correctionSuccess) {
    return (
      <div className="correction-panel success">
        <p className="success-text">धन्यवाद! वैद्या शिकली. 🌱</p>
        <p className="success-sub">
          तुमची सुधारणा Adaptive Data मध्ये नोंदवली गेली.
        </p>
      </div>
    );
  }

  return (
    <div className="correction-panel">
      <p className="correction-title">वैद्याला सुधारा</p>

      <p className="correction-label">योग्य अर्थ / सुधारणा लिहा</p>

      <textarea
        className="correction-input"
        placeholder="उदा. शरीर दुखतंय आणि थकवा आहे..."
        value={correctMeaning}
        onChange={(e) => setCorrectMeaning(e.target.value)}
        rows={3}
      />

      <p className="correction-label">बोली / प्रदेश निवडा</p>

      <div className="dialect-options">
        {DIALECTS.map((d) => (
          <button
            key={d.value}
            type="button"
            className={`dialect-btn ${dialect === d.value ? "selected" : ""}`}
            onClick={() => setDialect(d.value)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="correction-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          रद्द करा
        </button>

        <button
          type="button"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!correctMeaning.trim() || !dialect || correcting}
        >
          {correcting ? "नोंदवत आहे..." : "सुधारणा नोंदवा"}
        </button>
      </div>
    </div>
  );
}