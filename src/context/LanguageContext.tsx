import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, type Language, type TranslationKey } from "../data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const isLanguage = (value: string | null): value is Language =>
  value === "en" || value === "ar";

/** Saved choice wins; otherwise follow the device/browser language (Arabic -> ar, anything else -> en). */
const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem("malazc_lang");
    if (isLanguage(saved)) return saved;
  } catch {
    // Storage can be unavailable (private mode); fall back to the device language.
  }
  const deviceLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  const primary = deviceLanguages[0]?.toLowerCase() ?? "en";
  return primary.startsWith("ar") ? "ar" : "en";
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("malazc_lang", lang);
    } catch {
      // Ignore storage errors; the choice still applies for this session.
    }
  };

  // Sync lang changes to HTML element
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: TranslationKey) => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
