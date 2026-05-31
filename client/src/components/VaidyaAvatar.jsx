import vaidyaAvatar from '../assets/avatar/vaidya-idle.png';

export default function VaidyaAvatar({
  speaking = false,
  thinking = false,
  severity = 'LOW'
}) {
  const safeSeverity = severity || 'LOW';

  const statusText = thinking
    ? 'विचार करत आहे...'
    : speaking
      ? 'बोलत आहे...'
      : safeSeverity === 'EMERGENCY'
        ? 'आणीबाणी'
        : safeSeverity === 'HIGH'
          ? 'काळजी घ्या'
          : safeSeverity === 'MEDIUM'
            ? 'लक्ष द्या'
            : 'वैद्या';

  return (
    <div className={`vaidya-mini-avatar severity-${safeSeverity.toLowerCase()} ${speaking ? 'speaking' : ''}`}>
      <div className="vaidya-mini-glow" />

      <img
        src={vaidyaAvatar}
        alt="Vaidya"
        className="vaidya-mini-img"
      />

      <div className="vaidya-mini-status">
        <span className="vaidya-mini-dot" />
        <span>{statusText}</span>
      </div>
    </div>
  );
}