import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { Menu, X, Globe, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    document.title = t("companyName");
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language, t]);

  const toggleLang = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const navLinks = [
    { name: t("navHome"), path: "/" },
    { name: t("navAbout"), path: "/about" },
    { name: t("navLogistics"), path: "/logistics" },
    { name: t("navIT"), path: "/it" },
    { name: t("navContracting"), path: "/contracting" },
    { name: t("navMarketing"), path: "/marketing" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-3 bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm transition-transform group-hover:scale-105">
              <polygon points="0,0 0,100 47,50" fill="#1E3A8A" />
              <polygon points="100,0 100,100 53,50" fill="#00A651" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight uppercase text-gray-900">
              {t("companyName")}
            </span>
            <span
              className="text-xs font-semibold text-slate-500 text-right"
              dir="rtl"
            >
              {language === "en" ? "ملاذك" : "Malazc"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm transition-colors ${
                location.pathname === link.path
                  ? "font-semibold text-primary"
                  : "font-medium text-slate-500 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors"
            title="Switch language"
          >
            <span className={language === "ar" ? "opacity-40" : ""}>EN</span>
            <span className="w-[1px] h-3 bg-slate-300"></span>
            <span className={language === "en" ? "opacity-40" : ""}>
              العربية
            </span>
          </button>
          <Link
            to="/contact"
            className="px-5 py-1.5 bg-secondary text-white font-bold text-sm rounded-lg shadow-md hover:bg-secondary-hover transition-all"
          >
            {t("navContact")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm font-medium hover:bg-slate-50 transition-colors"
            title="Switch language"
          >
            <span className={language === "ar" ? "opacity-40" : ""}>EN</span>
            <span className="w-[1px] h-3 bg-slate-300"></span>
            <span className={language === "en" ? "opacity-40" : ""}>AR</span>
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -me-2 text-slate-600"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-[56px] left-0 right-0 md:hidden border-b border-gray-100 bg-white shadow-lg overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-base font-medium py-2 ${
                      location.pathname === link.path
                        ? "text-primary font-bold"
                        : "text-slate-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex justify-center w-full px-6 py-3 rounded-lg bg-secondary hover:bg-secondary-hover text-white font-bold"
                  >
                    {t("navContact")}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Branding */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm transition-transform group-hover:scale-105">
                    <polygon points="0,0 0,100 47,50" fill="#1E3A8A" />
                    <polygon points="100,0 100,100 53,50" fill="#00A651" />
                  </svg>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-bold tracking-tight uppercase text-white">
                    {t("companyName")}
                  </span>
                  <span
                    className="text-xs font-semibold text-slate-400 text-right opacity-80"
                    dir="rtl"
                  >
                    {language === "en" ? "ملاذك" : "Malazc"}
                  </span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400">
                {t("aboutBrief")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6">{t("navHome")}</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    {t("navHome")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-primary transition-colors"
                  >
                    {t("navAbout")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-primary transition-colors"
                  >
                    {t("navContact")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-6">{t("ourDivisions")}</h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    to="/logistics"
                    className="hover:text-primary transition-colors"
                  >
                    {t("navLogistics")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/it"
                    className="hover:text-primary transition-colors"
                  >
                    {t("navIT")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contracting"
                    className="hover:text-primary transition-colors"
                  >
                    {t("navContracting")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketing"
                    className="hover:text-primary transition-colors"
                  >
                    {t("navMarketing")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6">{t("navContact")}</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <span>{t("location")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <span dir="ltr">{t("phoneNumbers")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <span>{t("email")}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-medium uppercase tracking-widest text-slate-500">
            <p>
              © {new Date().getFullYear()} {t("companyName")}. Empowering Saudi
              Vision 2030.
            </p>
            <p>Official Integrated Solutions Partner</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
