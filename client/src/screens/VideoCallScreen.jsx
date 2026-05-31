import { useEffect, useMemo, useState } from 'react';

export default function VideoCallScreen({ worker, onEnd }) {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const safeWorkerName = worker?.name
    ? worker.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '')
    : 'asha';

  const roomName = useMemo(() => {
    return `vaidya-asha-${worker?.id || 'worker'}-${safeWorkerName}`;
  }, [worker?.id, safeWorkerName]);

  const jitsiUrl = useMemo(() => {
    const displayName = encodeURIComponent('Vaidya Patient');

    return (
      `https://meet.jit.si/${roomName}` +
      `#config.prejoinPageEnabled=false` +
      `&config.startWithAudioMuted=false` +
      `&config.startWithVideoMuted=false` +
      `&config.disableDeepLinking=true` +
      `&config.disableInviteFunctions=true` +
      `&config.requireDisplayName=false` +
      `&userInfo.displayName="${displayName}"`
    );
  }, [roomName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  async function copyCallLink() {
    try {
      await navigator.clipboard.writeText(`https://meet.jit.si/${roomName}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Link copy झाला नाही');
    }
  }

  return (
    <div className="video-screen">
      <div className="call-info-bar">
        <div className="call-worker-avatar">
          {worker?.name?.charAt(0) || 'आ'}
        </div>

        <div className="call-worker-info">
          <p className="call-name">
            {worker?.name || 'ASHA Worker'}
          </p>
          <p className="call-village">
            📍 {worker?.village || 'Nearby PHC'}
          </p>
        </div>

        <button
          className="copy-call-btn"
          onClick={copyCallLink}
          type="button"
        >
          {copied ? '✓ Copied' : '🔗 Link'}
        </button>

        <button
          className="end-call-btn-small"
          onClick={onEnd}
          type="button"
        >
          📵 संपवा
        </button>
      </div>

      {loading && (
        <div className="call-loading">
          <div className="calling-avatar">
            {worker?.name?.charAt(0) || 'आ'}
          </div>

          <p className="calling-name">
            {worker?.name || 'ASHA Worker'}
          </p>

          <p className="calling-status">
            सुरक्षित व्हिडिओ कॉल सुरू होत आहे...
          </p>

          <p className="calling-sub">
            Camera आणि microphone permission allow करा
          </p>

          <div className="calling-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      <iframe
        title="Vaidya ASHA Video Call"
        src={jitsiUrl}
        className="jitsi-frame"
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        allowFullScreen
        style={{
          display: loading ? 'none' : 'block'
        }}
      />
    </div>
  );
}