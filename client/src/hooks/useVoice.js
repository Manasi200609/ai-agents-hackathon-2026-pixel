import { useState } from 'react';

const LANG_MAP = {
  mr: 'mr-IN',
  hi: 'hi-IN',
  en: 'en-IN',
  gu: 'gu-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
  bn: 'bn-IN',
  as: 'as-IN',
  ks: 'ur-IN',
};

export function useVoice() {
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState('');

  function startListening(language = 'mr', onResult) {
    setVoiceError('');

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError('Voice recognition is not supported in this browser.');
      return;
    }

    if (
      window.location.protocol !== 'https:' &&
      window.location.hostname !== 'localhost'
    ) {
      setVoiceError('Voice input works only on HTTPS or localhost.');
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = LANG_MAP[language] || 'mr-IN';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';

      if (transcript && onResult) {
        onResult(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);

      if (event.error === 'not-allowed') {
        setVoiceError('Microphone permission was denied.');
      } else if (event.error === 'no-speech') {
        setVoiceError('No speech detected. Please try again.');
      } else if (event.error === 'network') {
        setVoiceError('Speech recognition needs internet connection.');
      } else {
        setVoiceError(`Voice error: ${event.error}`);
      }

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      console.error('Recognition start failed:', err);
      setVoiceError('Could not start voice recognition.');
      setListening(false);
    }
  }

  return {
    listening,
    voiceError,
    startListening,
  };
}