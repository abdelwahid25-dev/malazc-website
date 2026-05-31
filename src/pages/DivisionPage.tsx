import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface DivisionPageProps {
  id: "logistics" | "it" | "contracting" | "marketing";
  icon: React.ReactNode;
  imageUrl: string;
}

export default function DivisionPage({
  id,
  icon,
  imageUrl,
}: DivisionPageProps) {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  const titleKey =
    `${id}Title` as keyof (typeof import("../data/translations").translations)["en"];
  const descKey =
    `${id}Desc` as keyof (typeof import("../data/translations").translations)["en"];
  const featuresKey =
    `${id}Features` as keyof (typeof import("../data/translations").translations)["en"];

  const valuePoints = isRtl
    ? ["تنفيذ واضح", "متابعة مباشرة", "جودة قابلة للقياس"]
    : ["Clear execution", "Direct follow-up", "Measurable quality"];

  return (
    <div className="bg-white transition-colors dark:bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 dark:border-slate-800">
        <img
          src={imageUrl}
          alt={t(titleKey)}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.36]"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,166,81,0.2),transparent_44%,rgba(30,58,138,0.28))]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-lg border border-white/16 bg-white/10 text-primary backdrop-blur">
            {React.cloneElement(icon as React.ReactElement, {
              className: "h-7 w-7",
            })}
          </div>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white sm:text-6xl">
            {t(titleKey)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t(descKey)}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="mb-4 block text-sm font-extrabold uppercase text-primary">
              {t("learnMore")}
            </span>
            <h2 className="max-w-xl text-4xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-5xl">
              {isRtl ? "خدمة مصممة لتناسب عملك." : "A service shaped around your operation."}
            </h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
              {t(featuresKey)}
            </p>

            <div className="mt-8 grid gap-3">
              {valuePoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              {t("navContact")}
              <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            </Link>
          </div>

          <div className="elevated-surface overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <img
              src={imageUrl}
              alt={t(titleKey)}
              className="aspect-[4/3] h-full w-full object-cover"
            />
            <div className="grid gap-px bg-slate-200 dark:bg-slate-800 sm:grid-cols-3">
              {valuePoints.map((point) => (
                <div
                  key={point}
                  className="bg-white p-5 text-sm font-extrabold text-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
