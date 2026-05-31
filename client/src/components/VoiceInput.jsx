import { useEffect, useRef, useState } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceInput({
  onResult,
  speechCode = 'mr-IN',
  disabled = false,
  autoSend = false,
  onAutoSend
}) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(Boolean(SpeechRecognition));
  const recognitionRef = useRef(null);

  useEffect(() => {
    setSupported(Boolean(SpeechRecognition));
  }, []);

  function startListening() {
    if (!SpeechRecognition) {
      alert('या ब्राउझरमध्ये आवाज ओळखण्याची सुविधा उपलब्ध नाही. Chrome वापरून पाहा.');
      return;
    }

    if (disabled) return;

    try {
      const recognition = new SpeechRecognition();

      recognition.lang = speechCode || 'mr-IN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognitionRef.current = recognition;

      let finalText = '';

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event) => {
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalText += transcript;
          } else {
            interimText += transcript;
          }
        }

        const currentText = (finalText || interimText).trim();

        if (currentText) {
          onResult(currentText);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);

        if (event.error === 'not-allowed') {
          alert('माइक वापरण्याची परवानगी द्या.');
        } else if (event.error === 'no-speech') {
          alert('आवाज ऐकू आला नाही. पुन्हा बोला.');
        }
      };

      recognition.onend = () => {
        setListening(false);

        if (autoSend && finalText.trim() && onAutoSend) {
          setTimeout(() => {
            onAutoSend(finalText.trim());
          }, 300);
        }
      };

      recognition.start();
    } catch (err) {
      console.error('Voice start failed:', err);
      setListening(false);
    }
  }

  function stopListening() {
    try {
      recognitionRef.current?.stop();
      setListening(false);
    } catch (err) {
      console.error('Voice stop failed:', err);
    }
  }

  function handleClick() {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  }

  return (
    <button
      type="button"
      className={`voice-btn ${listening ? 'listening' : ''}`}
      onClick={handleClick}
      disabled={disabled || !supported}
      title={supported ? 'आवाजाने बोला' : 'Speech recognition not supported'}
    >
      {listening ? '■' : '🎙️'}
    </button>
  );
}