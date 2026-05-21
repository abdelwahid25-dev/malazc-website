import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#F9FAFB] py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center text-start relative z-10">
          <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center text-primary mb-8 border border-green-100">
            {React.cloneElement(icon as React.ReactElement<any, any>, {
              className: "w-8 h-8",
            })}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6">
            {t(titleKey)}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed italic">
            {t(descKey)}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-primary mb-8">
                {t("learnMore")}
              </h2>

              <div className="prose prose-lg text-slate-500 mb-10">
                <p>{t(featuresKey)}</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <p className="text-primary font-medium leading-relaxed">
                    We are committed to delivering the highest quality in{" "}
                    {t(titleKey).toLowerCase()} tailored precisely to your
                    needs.
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-amber-500 text-white font-bold hover:bg-amber-600 transition-all shadow-md"
                >
                  {t("navContact")}
                  <ArrowRight
                    className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                  />
                </Link>
              </div>
            </div>

            {/* Image Side */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-100 aspect-[4/3] group">
                <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-10 group-hover:opacity-0 transition-opacity z-10"></div>
                <img
                  src={imageUrl}
                  alt={t(titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
