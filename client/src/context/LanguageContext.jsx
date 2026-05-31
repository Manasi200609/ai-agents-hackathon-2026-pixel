import { createContext, useContext, useState } from 'react';
import { getUI, getSarvamCode, getSpeechCode } from '../config/languages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [langCode, setLangCode] = useState(() => {
    return localStorage.getItem('vaidya_lang') || 'mr';
  });

  const ui = getUI(langCode);
  const sarvamCode = getSarvamCode(langCode);
  const speechCode = getSpeechCode(langCode);

  function changeLanguage(code) {
    setLangCode(code);
    localStorage.setItem('vaidya_lang', code);
  }

  return (
    <LanguageContext.Provider value={{ langCode, ui, sarvamCode, speechCode, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}