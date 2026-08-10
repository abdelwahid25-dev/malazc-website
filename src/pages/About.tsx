import { useLanguage } from "../context/LanguageContext";
import { CheckCircle2, Flag, Target } from "lucide-react";

export default function About() {
  const { t } = useLanguage();
  const goals = [t("goal1"), t("goal2"), t("goal3")];

  return (
    <div className="bg-white transition-colors dark:bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 dark:border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
          alt={t("aboutHeroImageAlt")}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.34]"
        />
        <div className="absolute inset-0 bg-slate-950/68" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <span className="mb-5 inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-extrabold uppercase text-primary backdrop-blur">
            {t("navAbout")}
          </span>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white sm:text-6xl">
            {t("aboutUsTitle")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("aboutBrief")}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="elevated-surface rounded-lg border border-slate-200 bg-white p-7 transition-colors dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">
                {t("visionTitle")}
              </h2>
              <p className="mt-4 text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
                {t("visionDesc")}
              </p>
            </div>

            <div className="elevated-surface rounded-lg border border-slate-200 bg-white p-7 transition-colors dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-secondary/10 text-secondary dark:bg-primary/10 dark:text-primary">
                <Flag className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">
                {t("missionTitle")}
              </h2>
              <p className="mt-4 text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
                {t("missionDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-grid border-y border-slate-200 bg-slate-50 py-20 transition-colors dark:border-slate-800 dark:bg-slate-900/60 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <span className="mb-4 block text-sm font-extrabold uppercase text-primary">
                {t("aboutGoalsEyebrow")}
              </span>
              <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white sm:text-5xl">
                {t("goalsTitle")}
              </h2>
            </div>
            <p className="max-w-2xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
              {t("aboutGoalsDesc")}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {goals.map((goal, idx) => (
              <div
                key={goal}
                className="rounded-lg border border-slate-200 bg-white p-6 transition-colors dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="mb-8 flex items-center justify-between">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="text-4xl font-extrabold text-slate-200 dark:text-slate-800">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-base font-semibold leading-8 text-slate-700 dark:text-slate-300">
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
