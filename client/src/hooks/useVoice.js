import { useEffect, useState } from "react";

export function useVoice() {
  const [listening, setListening] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    function loadVoices() {
      setVoices(window.speechSynthesis.getVoices());
    }

    if ("speechSynthesis" in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  function speak(text, lang = "mr-IN") {
    if (!text) return;

    if (!("speechSynthesis" in window)) {
      console.warn("Speech synthesis not supported");
      return;
    }

    const availableVoices =
      voices.length > 0 ? voices : window.speechSynthesis.getVoices();

    const selectedVoice =
      availableVoices.find((v) => v.lang === lang) ||
      availableVoices.find((v) => v.lang.startsWith(lang.split("-")[0])) ||
      availableVoices.find((v) => v.lang === "hi-IN") ||
      availableVoices.find((v) => v.lang === "en-IN") ||
      availableVoices[0];

    const utterance = new SpeechSynthesisUtterance(text);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = lang;
    }

    utterance.volume = 1;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.cancel();

    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 150);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
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

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      onResult?.(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      onError?.(event.error);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  }

  return {
    listening,
    speak,
    stopSpeaking,
    startListening,
  };
}