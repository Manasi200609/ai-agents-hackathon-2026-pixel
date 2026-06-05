import { useEffect, useRef, useState, useCallback } from 'react';
import { useChat } from '../hooks/useChat';
import { useVoice } from '../hooks/useVoice';
import { useLanguage } from '../context/LanguageContext';
import MessageBubble from './MessageBubble';
import VoiceInput from './VoiceInput';
import vaidyaBg from '../assets/avatar/vaidya-idle.png';

export default function ChatWindow({ initialMessage, onCallASHA }) {
  const { messages, loading, error, send } = useChat();
  const { speak } = useVoice();
  const { langCode, ui, speechCode } = useLanguage();

  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const initialSent = useRef(false);

  const speakInSelectedLanguage = useCallback(
    (text) => {
      if (!text) return;

      if (typeof speak !== 'function') {
        console.warn('speak is not available from useVoice');
        return;
      }

      speak(text, speechCode || 'mr-IN');
    },
    [speak, speechCode]
  );

  useEffect(() => {
    if (initialMessage && !initialSent.current) {
      initialSent.current = true;
      send(initialMessage, speakInSelectedLanguage, langCode);
    }
  }, [initialMessage, langCode, send, speakInSelectedLanguage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function handleSend() {
    if (!input.trim() || loading) return;

    send(input, speakInSelectedLanguage, langCode);
    setInput('');
    textareaRef.current?.focus();
  }

  function handleVoiceResult(text) {
    setInput(text);
  }

  function handleVoiceAutoSend(text) {
    if (!text?.trim() || loading) return;

    send(text, speakInSelectedLanguage, langCode);
    setInput('');
    textareaRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-page">
      <div
        className="chat-page-bg"
        style={{ backgroundImage: `url(${vaidyaBg})` }}
      />
      <div className="chat-page-shade" />

      <div className="chat-scroll">
        <div className="chat-top-spacer" />

        {messages.map((msg, idx) => (
          <MessageBubble
            key={`${msg.role}-${idx}`}
            message={msg}
            userInput={
              msg.role === 'assistant'
                ? messages[idx - 1]?.content || ''
                : ''
            }
            onCallASHA={onCallASHA}
          />
        ))}

        {loading && (
          <div className="bubble-wrapper assistant">
            <div className="avatar">व</div>
            <div className="bubble bubble-assistant typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        {error && <div className="error-msg">{error}</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-compose">
        <VoiceInput
          onResult={handleVoiceResult}
          onAutoSend={handleVoiceAutoSend}
          speechCode={speechCode || 'mr-IN'}
          disabled={loading}
          autoSend={false}
        />

        <textarea
          ref={textareaRef}
          className="chat-input"
          placeholder={ui?.type_here || 'तुमची तक्रार इथे लिहा...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        <button
          className="send-btn"
          type="button"
          onClick={handleSend}
          disabled={!input.trim() || loading}
          aria-label="Send message"
        >
          ↑
        </button>
      </div>
    </div>
  );
}