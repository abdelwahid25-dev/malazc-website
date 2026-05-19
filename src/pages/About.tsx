import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Target, Flag, CheckCircle2 } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#F9FAFB] py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start relative z-10">
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-green-50 border border-green-100 text-primary text-xs font-bold uppercase tracking-wider">
            {t("navAbout")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
            {t("aboutUsTitle")}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed italic">
            {t("aboutBrief")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("visionTitle")}
              </h2>
              <p className="text-slate-500 leading-relaxed text-lg">
                {t("visionDesc")}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-10 shadow-sm border border-slate-100 relative group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Flag className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("missionTitle")}
              </h2>
              <p className="text-slate-500 leading-relaxed text-lg">
                {t("missionDesc")}
              </p>
            </div>
          </div>

          {/* Goals */}
          <div className="bg-[#F9FAFB] rounded-2xl p-10 md:p-16 border border-slate-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-primary mb-4">
                {t("goalsTitle")}
              </h2>
              <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[t("goal1"), t("goal2"), t("goal3")].map((goal, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-sm border border-slate-50 group hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
