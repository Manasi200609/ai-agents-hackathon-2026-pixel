import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useHistory } from '../hooks/useHistory';

export default function HistoryScreen({ userId }) {
  const { ui } = useLanguage();
  const { getHistory } = useHistory();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        if (!userId) {
          setHistory([]);
          return;
        }

        const data = await getHistory(userId);
        setHistory(data);
      } catch (err) {
        console.error('History load failed:', err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [userId]);

  function formatDate(timestamp) {
    if (!timestamp?.toDate) return 'आज';

    return timestamp.toDate().toLocaleDateString('mr-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function getSymptom(item) {
    return item.symptom_summary || item.userMessage || 'आरोग्य संवाद';
  }

  function getMessages(item) {
    if (Array.isArray(item.messages) && item.messages.length > 0) {
      return item.messages;
    }

    return [
      {
        role: 'user',
        content: item.userMessage || item.symptom_summary || 'संवाद',
      },
      {
        role: 'assistant',
        content: item.aiReply || 'उत्तर उपलब्ध नाही',
      },
    ];
  }

  return (
    <div className="screen history-screen">
      <div className="screen-header">
        <h2 className="screen-title">{ui?.history || 'मागील संवाद'}</h2>
        <p className="screen-sub">तुमचे जतन झालेले आरोग्य संवाद</p>
      </div>

      {loading ? (
        <div className="empty-state">
          <p className="empty-icon">⏳</p>
          <p className="empty-title">लोड होत आहे...</p>
        </div>
      ) : history.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📋</p>
          <p className="empty-title">अजून कोणताही संवाद नाही</p>
          <p className="empty-sub">वैद्याशी बोलल्यावर इथे दिसेल</p>
        </div>
      ) : (
        <div className="history-list compact-history-list">
          {history.map((item) => (
            <button
              key={item.id}
              type="button"
              className="history-summary-card"
              onClick={() => setSelectedChat(item)}
            >
              <div>
                <p className="history-main-symptom">{getSymptom(item)}</p>
                <p className="history-mini-label">
                  संवाद पाहण्यासाठी टॅप करा
                </p>
              </div>

              <div className="history-side">
                <span
                  className={`history-severity severity-${(
                    item.severity || 'LOW'
                  ).toLowerCase()}`}
                >
                  {item.severity || 'LOW'}
                </span>

                <span className="history-date-small">
                  {formatDate(item.updated_at || item.created_at)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedChat && (
        <div
          className="history-modal-backdrop"
          onClick={() => setSelectedChat(null)}
        >
          <div
            className="history-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="history-modal-header">
              <div>
                <h3>{getSymptom(selectedChat)}</h3>
                <p>
                  {formatDate(selectedChat.updated_at || selectedChat.created_at)}
                </p>
              </div>

              <button
                type="button"
                className="history-modal-close"
                onClick={() => setSelectedChat(null)}
              >
                ×
              </button>
            </div>

            <div className="history-modal-chat">
              {getMessages(selectedChat).map((msg, index) => (
                <div
                  key={index}
                  className={`history-chat-row ${
                    msg.role === 'user' ? 'user' : 'assistant'
                  }`}
                >
                  <div className="history-chat-bubble">
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}