export default function SeverityBar({ severity, onCallASHA, ui }) {
  const sev = (severity || 'LOW').toUpperCase();

  if (sev === 'LOW') {
    return null;
  }

  if (sev === 'MEDIUM' || sev === 'HIGH') {
    return (
      <button
        type="button"
        className="severity-action-asha"
        onClick={onCallASHA}
      >
        <span className="asha-connect-dot" />
        {ui.talk_to_asha || '👩‍⚕️ Talk to ASHA Worker'}
      </button>
    );
  }

  if (sev === 'EMERGENCY') {
    return (
      <a
        href="tel:108"
        className="severity-action-emergency"
      >
        🚨 {ui.call_108 || 'Call 108 immediately'}
      </a>
    );
  }

  return null;
}