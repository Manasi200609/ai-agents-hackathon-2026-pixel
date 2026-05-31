export default function ASHAScreen({ onStartCall }) {
  return (
    <div className="asha-screen">
      <section className="asha-hero">
        <div className="asha-hero-top">
          <div className="asha-avatar">👩‍⚕️</div>
          <div>
            <h2 className="asha-title">ASHA दीदी</h2>
            <p className="asha-subtitle">
              मध्यम किंवा गंभीर लक्षणांसाठी स्थानिक आरोग्य मार्गदर्शन.
            </p>
          </div>
        </div>

        <div className="asha-status">
          <span className="asha-status-dot" />
          <span>मदतीसाठी उपलब्ध</span>
        </div>
      </section>

      <button type="button" className="asha-primary-btn" onClick={onStartCall}>
        👩‍⚕️ ASHA दीदीशी व्हिडिओ कॉल करा
      </button>

      <div className="asha-actions">
        <button type="button" className="asha-action-card">
          <div className="asha-action-icon">📞</div>
          <h3 className="asha-action-title">फोन कॉल</h3>
          <p className="asha-action-sub">नेट कमी असल्यास आवाज कॉल वापरा.</p>
        </button>

        <button type="button" className="asha-action-card">
          <div className="asha-action-icon">🏥</div>
          <h3 className="asha-action-title">PHC मदत</h3>
          <p className="asha-action-sub">जवळच्या आरोग्य केंद्रासाठी मार्गदर्शन.</p>
        </button>
      </div>

      <div className="asha-info-list">
        <article className="asha-info-card">
          <div className="asha-info-icon">⚠️</div>
          <div>
            <h3 className="asha-info-title">गंभीर लक्षणे असल्यास</h3>
            <p className="asha-info-text">
              श्वास घेण्यास त्रास, छातीत दुखणे, जास्त रक्तस्त्राव किंवा बेशुद्धपणा असल्यास 108 वर संपर्क करा.
            </p>
          </div>
        </article>

        <article className="asha-info-card">
          <div className="asha-info-icon">📝</div>
          <div>
            <h3 className="asha-info-title">कॉलपूर्वी माहिती तयार ठेवा</h3>
            <p className="asha-info-text">
              लक्षणे किती दिवसांपासून आहेत, ताप आहे का आणि औषध घेतले आहे का — ही माहिती सांगा.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
