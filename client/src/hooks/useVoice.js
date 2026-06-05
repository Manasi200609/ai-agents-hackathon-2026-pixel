import { useState } from "react";

export function useVoice() {
  const [listening, setListening] = useState(false);

  function speak(text, lang = "mr-IN") {
    if (!text) return;

    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis is not supported in this browser");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function startListening({ lang = "mr-IN", onResult, onError } = {}) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const msg = "Speech recognition is not supported in this browser";
      console.warn(msg);
      onError?.(msg);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      onResult?.(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      onError?.(event.error);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  return {
    listening,
    speak,
    startListening,
    stopSpeaking,
  };
}