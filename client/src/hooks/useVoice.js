import { useRef, useState } from 'react';
import { speakText } from '../api/index';

export function useVoice() {
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef(null);

  async function speak(text, langCode = 'mr-IN') {
    if (!text || !text.trim()) return;

    try {
      stop();

      setSpeaking(true);

      const audioBlob = await speakText(text, langCode);
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = () => {
        setSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err) {
      console.error('TTS playback failed:', err);
      setSpeaking(false);
    }
  }

  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setSpeaking(false);
  }

  return {
    speak,
    stop,
    speaking
  };
}