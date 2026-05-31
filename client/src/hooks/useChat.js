import { useRef, useState } from 'react';
import { sendMessage } from '../api/index';
import { useHistory } from './useHistory';
import { useAuth } from './useAuth';

export function cleanResponse(text) {
  return String(text || '')
    .replace(/\[SEVERITY:(LOW|MEDIUM|HIGH|EMERGENCY)\]/gi, '')
    .trim();
}

export function parseSeverity(text) {
  const match = String(text || '').match(
    /\[SEVERITY:(LOW|MEDIUM|HIGH|EMERGENCY)\]/i
  );

  return match ? match[1].toUpperCase() : 'LOW';
}

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [severity, setSeverity] = useState('LOW');

  const conversationIdRef = useRef(null);

  const {
    createConversation,
    addMessageToConversation,
  } = useHistory();

  const { user } = useAuth();

  async function send(userText, speakFn, language = 'mr', gender = '') {
    const cleanUserText = String(userText || '').trim();

    if (!cleanUserText || loading) return;

    const userMessage = {
      role: 'user',
      content: cleanUserText,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);
    setError(null);

    try {
      if (user?.uid && !conversationIdRef.current) {
        conversationIdRef.current = await createConversation({
          userId: user.uid,
          firstUserMessage: cleanUserText,
          language,
        });
      } else if (user?.uid && conversationIdRef.current) {
        await addMessageToConversation({
          userId: user.uid,
          conversationId: conversationIdRef.current,
          message: userMessage,
          severity,
        });
      }

      const apiMessages = updatedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const result = await sendMessage(apiMessages, gender, language);

      const rawReply = result?.reply || '';

      const detectedSeverity =
        result?.agents?.severityData?.severity ||
        result?.triage?.severity ||
        parseSeverity(rawReply) ||
        'LOW';

      const finalSeverity = String(detectedSeverity).toUpperCase();
      const cleanedReply = cleanResponse(rawReply);

      setSeverity(finalSeverity);

      const assistantMessage = {
        role: 'assistant',
        content: cleanedReply,
        severity: finalSeverity,
        agents: result?.agents || {},
        language: result?.language || {},
      };

      setMessages([...updatedMessages, assistantMessage]);

      if (user?.uid && conversationIdRef.current) {
        await addMessageToConversation({
          userId: user.uid,
          conversationId: conversationIdRef.current,
          message: assistantMessage,
          severity: finalSeverity,
        });
      }

      if (speakFn && cleanedReply) {
        speakFn(cleanedReply);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('वैद्याशी संपर्क होत नाही. पुन्हा प्रयत्न करा.');
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setMessages([]);
    setError(null);
    setSeverity('LOW');
    conversationIdRef.current = null;
  }

  return {
    messages,
    loading,
    error,
    severity,
    send,
    clear,
  };
}