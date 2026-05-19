import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "../data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof translations)["en"]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Initialize lang and dir on mount
  useEffect(() => {
    // Check if user has a preference in localStorage or default to 'ar' maybe? Let's default to 'ar' since it's a Saudi company
    const savedLang = localStorage.getItem("malazc_lang") as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    } else {
      setLanguageState("ar");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("malazc_lang", lang);
  };

  // Sync lang changes to HTML element
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const t = (key: keyof (typeof translations)["en"]) => {
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
