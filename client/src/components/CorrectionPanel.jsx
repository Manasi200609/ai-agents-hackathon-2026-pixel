import { useState } from "react";
import { useAdaptive } from "../hooks/useAdaptive";
import { useLanguage } from "../context/LanguageContext";

const TEXT = {
  mr: {
    title: "वैद्याला सुधारा",
    userSaid: "रुग्णाने सांगितले",
    aiSaid: "वैद्याचा अर्थ",
    labelCorrection: "योग्य अर्थ / सुधारणा लिहा",
    placeholder: "उदा. शरीर दुखतंय आणि थकवा आहे...",
    labelDialect: "बोली / प्रदेश निवडा",
    labelSeverity: "तीव्रता निवडा",
    cancel: "रद्द करा",
    submit: "सुधारणा नोंदवा",
    submitting: "नोंदवत आहे...",
    success: "धन्यवाद! वैद्या शिकली. 🌱",
    successSub: "तुमची सुधारणा Adaptive Data मध्ये नोंदवली गेली.",
    required: "कृपया योग्य अर्थ आणि बोली निवडा.",
  },
  hi: {
    title: "वैद्य को सुधारें",
    userSaid: "मरीज ने कहा",
    aiSaid: "वैद्य का अर्थ",
    labelCorrection: "सही अर्थ / सुधार लिखें",
    placeholder: "उदा. शरीर में दर्द और थकान है...",
    labelDialect: "बोली / क्षेत्र चुनें",
    labelSeverity: "गंभीरता चुनें",
    cancel: "रद्द करें",
    submit: "सुधार दर्ज करें",
    submitting: "दर्ज हो रहा है...",
    success: "धन्यवाद! वैद्य ने सीख लिया. 🌱",
    successSub: "आपका सुधार Adaptive Data में दर्ज हो गया.",
    required: "कृपया सही अर्थ और बोली चुनें.",
  },
  en: {
    title: "Correct Vaidya",
    userSaid: "User said",
    aiSaid: "Vaidya interpreted",
    labelCorrection: "Write the correct meaning / correction",
    placeholder: "Example: Body pain with tiredness...",
    labelDialect: "Select dialect / region",
    labelSeverity: "Select severity",
    cancel: "Cancel",
    submit: "Submit correction",
    submitting: "Submitting...",
    success: "Thank you! Vaidya learned. 🌱",
    successSub: "Your correction was added to Adaptive Data.",
    required: "Please enter correction and select dialect.",
  },
};

const DIALECTS = [
  { value: "vidarbha", label: "Vidarbha" },
  { value: "marathwada", label: "Marathwada" },
  { value: "konkan", label: "Konkan" },
  { value: "pune", label: "Pune / Western Maharashtra" },
  { value: "varhad", label: "Varhad" },
  { value: "rural", label: "Rural / Local dialect" },
  { value: "other", label: "Other" },
];

const SEVERITIES = ["LOW", "MEDIUM", "HIGH", "EMERGENCY"];

export default function CorrectionPanel({
  aiResponse,
  userInput,
  severity = "LOW",
  onClose,
}) {
  const { correct, correcting, correctionSuccess } = useAdaptive();
  const { langCode } = useLanguage();

  const t = TEXT[langCode] || TEXT.en;

  const [correctMeaning, setCorrectMeaning] = useState("");
  const [dialect, setDialect] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState(severity || "LOW");
  const [localError, setLocalError] = useState("");

  async function handleSubmit() {
    if (!correctMeaning.trim() || !dialect) {
      setLocalError(t.required);
      return;
    }

    setLocalError("");

    await correct({
      original_input: userInput || "",
      ai_interpretation: aiResponse || "",
      correct_meaning: correctMeaning.trim(),
      dialect,
      language: langCode || "mr",
      severity: selectedSeverity,
      user_role: "patient",
    });

    setTimeout(() => {
      onClose?.();
    }, 1800);
  }

  if (correctionSuccess) {
    return (
      <div className="correction-panel success">
        <div className="success-icon">🌱</div>
        <p className="success-text">{t.success}</p>
        <p className="success-sub">{t.successSub}</p>
      </div>
    );
  }

  return (
    <div className="correction-panel">
      <div className="correction-header">
        <p className="correction-title">{t.title}</p>

        <button type="button" className="correction-close" onClick={onClose}>
          ×
        </button>
      </div>

      {userInput && (
        <div className="correction-context">
          <span>{t.userSaid}</span>
          <p>{userInput}</p>
        </div>
      )}

      {aiResponse && (
        <div className="correction-context ai">
          <span>{t.aiSaid}</span>
          <p>{aiResponse}</p>
        </div>
      )}

      <label className="correction-label">{t.labelCorrection}</label>

      <textarea
        className="correction-input"
        placeholder={t.placeholder}
        value={correctMeaning}
        onChange={(e) => setCorrectMeaning(e.target.value)}
        rows={3}
      />

      <label className="correction-label">{t.labelDialect}</label>

      <div className="dialect-options">
        {DIALECTS.map((item) => (
          <button
            key={item.value}
            type="button"
            className={`dialect-btn ${dialect === item.value ? "selected" : ""}`}
            onClick={() => setDialect(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <label className="correction-label">{t.labelSeverity}</label>

      <div className="severity-options">
        {SEVERITIES.map((item) => (
          <button
            key={item}
            type="button"
            className={`severity-chip ${selectedSeverity === item ? "selected" : ""} ${item.toLowerCase()}`}
            onClick={() => setSelectedSeverity(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {localError && <p className="correction-error">{localError}</p>}

      <div className="correction-actions">
        <button type="button" className="cancel-btn" onClick={onClose}>
          {t.cancel}
        </button>

        <button
          type="button"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!correctMeaning.trim() || !dialect || correcting}
        >
          {correcting ? t.submitting : t.submit}
        </button>
      </div>
    </div>
  );
}