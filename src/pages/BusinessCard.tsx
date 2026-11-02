import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getEmployeeBySlug, loc } from "../data/organization";
import { BusinessCardView } from "../components/org/BusinessCardView";

/** Standalone, mobile-first digital business card — meant to be opened from an NFC tag or QR code. */
const BusinessCard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const employee = getEmployeeBySlug(slug);

  useEffect(() => {
    const previous = document.title;
    if (employee) {
      document.title = `${loc(employee.name, language)} | ${t("companyName")}`;
    }
    return () => {
      document.title = previous;
    };
  }, [employee, language, t]);

  if (!employee) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center dark:bg-slate-950">
        <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">
          {t("cardNotFoundTitle")}
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {t("cardNotFoundDesc")}
        </p>
        <Link
          to="/"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-hover"
        >
          {t("cardBackHome")}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 dark:bg-slate-950 sm:py-10">
      <BusinessCardView employee={employee} />
      <p className="mt-4 text-center">
        <Link
          to="/"
          className="text-xs font-bold text-slate-500 hover:text-primary dark:text-slate-400"
        >
          {t("cardVisitWebsite")}
        </Link>
      </p>
    </main>
  );
};

export default BusinessCard;
