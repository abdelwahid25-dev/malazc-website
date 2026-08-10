import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Sun,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isDark = theme === "dark";
  const isRtl = language === "ar";
  const themeLabel = t(isDark ? "themeSwitchToLight" : "themeSwitchToDark");
  const nextLanguage = language === "ar" ? "en" : "ar";
  const nextLanguageLabel = t(
    nextLanguage === "en" ? "switchToEnglish" : "switchToArabic",
  );

  React.useEffect(() => {
    document.title = t("companyName");
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl, language, t]);

  const toggleLang = () => {
    setLanguage(nextLanguage);
  };

  const navLinks = [
    { name: t("navHome"), path: "/" },
    { name: t("navAbout"), path: "/about" },
    { name: t("navLogistics"), path: "/logistics" },
    { name: t("navIT"), path: "/it" },
    { name: t("navContracting"), path: "/contracting" },
    { name: t("navMarketing"), path: "/marketing" },
  ];

  const footerLinks = [
    { name: t("navAbout"), path: "/about" },
    { name: t("navLogistics"), path: "/logistics" },
    { name: t("navIT"), path: "/it" },
    { name: t("navContracting"), path: "/contracting" },
    { name: t("navMarketing"), path: "/marketing" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/88 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-950/88">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group flex items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-transform group-hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
              >
                <polygon points="0,0 0,100 47,50" fill="#1E3A8A" />
                <polygon points="100,0 100,100 53,50" fill="#00A651" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold uppercase text-slate-950 dark:text-white">
                {t("companyName")}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t("companyNameAlt")}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${isActive
                      ? "bg-primary/10 text-primary"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary dark:border-slate-800 dark:text-slate-300 dark:hover:border-primary/30 dark:hover:bg-primary/10"
              title={themeLabel}
              aria-label={themeLabel}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleLang}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700 transition-colors hover:border-secondary/40 hover:bg-secondary/5 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
              title={t("switchLanguage")}
            >
              <span className={isRtl ? "opacity-40" : ""}>EN</span>
              <span className="h-3 w-px bg-slate-300 dark:bg-slate-700" />
              <span className={isRtl ? "" : "opacity-40"}>AR</span>
            </button>
            <Link
              to="/contact"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-secondary px-5 text-sm font-extrabold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary-hover"
            >
              {t("navContact")}
              <ArrowUpRight className={`h-4 w-4 ${isRtl ? "-scale-x-100" : ""}`} />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
              title={themeLabel}
              aria-label={themeLabel}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
              aria-label={t(isMobileMenuOpen ? "closeMenu" : "openMenu")}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="border-t border-slate-200 bg-white px-5 py-5 shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30 lg:hidden"
            >
              <div className="mx-auto max-w-7xl space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block rounded-md px-3 py-3 text-base font-bold transition-colors ${isActive
                          ? "bg-primary/10 text-primary"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button
                    onClick={toggleLang}
                    className="rounded-md border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 dark:border-slate-800 dark:text-slate-200"
                  >
                    {nextLanguageLabel}
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-md bg-secondary px-4 py-3 text-center text-sm font-extrabold text-white"
                  >
                    {t("navContact")}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 text-slate-300 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr_1fr]">
            <div>
              <Link to="/" className="mb-6 inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                  >
                    <polygon points="0,0 0,100 47,50" fill="#1E3A8A" />
                    <polygon points="100,0 100,100 53,50" fill="#00A651" />
                  </svg>
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-lg font-extrabold uppercase text-white">
                    {t("companyName")}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {t("companyNameAlt")}
                  </span>
                </span>
              </Link>
              <p className="max-w-md text-sm leading-7 text-slate-400">
                {t("aboutBrief")}
              </p>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-extrabold uppercase text-white">
                {t("ourDivisions")}
              </h4>
              <div className="grid gap-3 text-sm">
                {footerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="w-fit text-slate-400 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-extrabold uppercase text-white">
                {t("navContact")}
              </h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{t("location")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <span dir="ltr">{t("phoneNumbers")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{t("email")}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-xs font-semibold uppercase text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {t("companyName")}.{" "}
              {t("allRightsReserved")}
            </p>
            <p>{t("integratedSolutionsPartner")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
