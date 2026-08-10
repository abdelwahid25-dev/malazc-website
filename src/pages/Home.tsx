import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Flag,
  Globe,
  HardHat,
  Laptop,
  Target,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  const stats = [
    {
      label: t("statsYearsLabel"),
      value: "10+",
      icon: <Award className="h-5 w-5" />,
    },
    {
      label: t("statsProjectsLabel"),
      value: "100+",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      label: t("statsClientsLabel"),
      value: "50+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: t("statsCitiesLabel"),
      value: "15+",
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  const divisions = [
    {
      id: "logistics",
      title: t("navLogistics"),
      desc: t("logisticsFeatures"),
      icon: <Truck />,
      path: "/logistics",
      image:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop",
      accent: "bg-secondary",
    },
    {
      id: "it",
      title: t("navIT"),
      desc: t("itFeatures"),
      icon: <Laptop />,
      path: "/it",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      accent: "bg-primary",
    },
    {
      id: "contracting",
      title: t("navContracting"),
      desc: t("contractingFeatures"),
      icon: <HardHat />,
      path: "/contracting",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
      accent: "bg-amber-500",
    },
    {
      id: "marketing",
      title: t("navMarketing"),
      desc: t("marketingFeatures"),
      icon: <TrendingUp />,
      path: "/marketing",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      accent: "bg-slate-950 dark:bg-white",
    },
  ];

  const principles = [
    {
      title: t("visionTitle"),
      text: t("visionDesc"),
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: t("missionTitle"),
      text: t("missionDesc"),
      icon: <Flag className="h-5 w-5" />,
    },
  ];
  const homeAboutBrief = t("homeAboutBrief");

  return (
    <div className="bg-white transition-colors dark:bg-slate-950">
      <section className="relative min-h-[78svh] overflow-hidden bg-slate-50 transition-colors dark:bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt={t("homeHeroImageAlt")}
          className="absolute inset-0 h-full w-full object-cover opacity-20 saturate-75 dark:opacity-100 dark:saturate-100"
        />
        <div className="absolute inset-0 bg-white/[0.86] dark:bg-slate-950/72" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,166,81,0.12),transparent_42%,rgba(30,58,138,0.12))] dark:hidden" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,166,81,0.22),transparent_42%,rgba(30,58,138,0.28))] dark:block" />

        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-center px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white/[0.82] px-3 py-2 text-xs font-extrabold uppercase text-slate-700 shadow-sm backdrop-blur dark:border-white/18 dark:bg-white/10 dark:text-white">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {t("homeHeroEyebrow")}
              </span>
              <h1 className="max-w-5xl text-5xl font-extrabold leading-[0.95] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                {t("companyName")}
                <span className="block text-primary">
                  {t("heroHeadlineHighlight")}
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-slate-600 dark:text-slate-200 sm:text-xl">
                {homeAboutBrief}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
                >
                  {t("contactUs")}
                  <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
                <a
                  href="#divisions"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white/[0.82] px-7 py-4 text-sm font-extrabold text-slate-950 shadow-sm backdrop-blur transition-colors hover:bg-white dark:border-white/24 dark:bg-white/10 dark:text-white dark:hover:bg-white/16"
                >
                  {t("ourDivisions")}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="elevated-surface rounded-lg border border-slate-200 bg-white/[0.82] p-5 backdrop-blur-md dark:border-white/14 dark:bg-slate-950/55"
            >
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white p-5 dark:bg-slate-950/55">
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary dark:bg-white/10">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-extrabold text-slate-950 dark:text-white">{stat.value}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="divisions" className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-end">
            <div>
              <span className="mb-4 block text-sm font-extrabold uppercase text-primary">
                {t("homeDivisionsEyebrow")}
              </span>
              <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-5xl">
                {t("ourDivisions")}
              </h2>
            </div>
            <p className="max-w-2xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300 lg:justify-self-end">
              {t("homeSubheadline")}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {divisions.map((div, index) => (
              <motion.div
                key={div.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Link
                  to={div.path}
                  className="group elevated-surface block overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/25 transition-colors group-hover:bg-slate-950/10" />
                    <div className={`absolute start-4 top-4 h-11 w-11 rounded-md ${div.accent} flex items-center justify-center text-white shadow-lg`}>
                      {React.cloneElement(div.icon as React.ReactElement, {
                        className: "h-5 w-5",
                      })}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                        {div.title}
                      </h3>
                      <ArrowRight
                        className={`h-5 w-5 text-primary transition-transform ${isRtl
                          ? "rotate-180 group-hover:-translate-x-1"
                          : "group-hover:translate-x-1"
                          }`}
                      />
                    </div>
                    <p className="text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
                      {div.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-grid border-y border-slate-200 bg-slate-50 py-20 transition-colors dark:border-slate-800 dark:bg-slate-900/60 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
              alt={t("homeTeamImageAlt")}
              className="aspect-[5/4] h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-slate-950/72 p-5 text-white backdrop-blur-sm">
              <div className="text-sm font-extrabold uppercase text-primary">
                {t("homeTrustEyebrow")}
              </div>
              <p className="mt-1 text-sm text-slate-200">
                {t("homeTrustText")}
              </p>
            </div>
          </div>

          <div>
            <span className="mb-4 block text-sm font-extrabold uppercase text-primary">
              {t("navAbout")}
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-5xl">
              {t("companyName")}{" "}
              <span className="text-secondary dark:text-primary">
                {t("homeAboutHeadlineSuffix")}
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
              {homeAboutBrief}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {principles.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-secondary-hover"
            >
              {t("learnMore")}
              <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt={t("homeCtaImageAlt")}
            className="absolute inset-0 h-full w-full object-cover opacity-[0.32]"
          />
          <div className="absolute inset-0 bg-slate-950/62" />
          <div className="relative grid gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
            <div>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                {t("homeCtaTitle")}
              </h2>
              <p className="mt-4 max-w-2xl text-base font-medium leading-8 text-slate-300">
                {t("homeCtaDesc")}
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              {t("contactUs")}
              <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
