import ar from "./translations/ar.json";
import en from "./translations/en.json";

export type Language = "en" | "ar";
export type TranslationKey = keyof typeof en;

type TranslationMap = Record<TranslationKey, string>;

export const translations: Record<Language, TranslationMap> = {
  en,
  ar,
};
