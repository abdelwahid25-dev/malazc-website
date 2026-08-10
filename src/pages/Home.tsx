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
  Mail,
  MapPin,
  Phone,
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
      <section className="relative isolate overflow-hidden bg-slate-50 transition-colors dark:bg-[#020617]">
        {/* Brand photo: prominent in light mode, dissolved into atmospheric texture in dark mode */}
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
          alt={t("homeHeroImageAlt")}
          className="absolute inset-0 h-full w-full object-cover opacity-20 saturate-75 dark:opacity-[0.05] dark:blur-2xl dark:saturate-0"
        />

        {/* Light-mode overlay (unchanged look) */}
        <div className="absolute inset-0 bg-white/[0.86] dark:hidden" />
        {/* Light-mode brand tint */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,166,81,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(30,58,138,0.2),transparent_36%)] dark:hidden" />

        {/* Dark-mode: deep midnight canvas that fully absorbs the photo's rectangular edges */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(130% 120% at 50% -10%, rgba(15,33,66,0.72), rgba(2,6,23,0.97) 62%), linear-gradient(180deg, #030918 0%, #020617 100%)",
          }}
        />
        {/* Dark-mode: ambient brand glows (green + blue) */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            background:
              "radial-gradient(42% 38% at 16% 24%, rgba(0,166,81,0.18), transparent 70%), radial-gradient(48% 44% at 86% 80%, rgba(37,99,235,0.22), transparent 72%)",
          }}
        />
        {/* Dark-mode: subtle tech grid + diagonal network streaks (masked, no hard edges) */}
        <div className="absolute inset-0 hidden dark:block hero-grid" />
        <div className="absolute inset-0 hidden dark:block hero-streaks" />
        {/* Dark-mode: soft top vignette for depth */}
        <div className="absolute inset-x-0 top-0 hidden h-40 dark:block bg-gradient-to-b from-black/40 to-transparent" />

        {/* Soft brand blobs (both modes, gentler in dark) */}
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl dark:bg-primary/[0.12]" />
        <div className="absolute -right-6 top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/[0.14]" />

        <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-center px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/[0.82] px-3 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-slate-700 shadow-sm backdrop-blur dark:border-white/18 dark:bg-white/10 dark:text-white">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {t("homeHeroEyebrow")}
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {t("homeHeroTrustedPartner")}
                </span>
              </div>
              <h1
                className={`max-w-5xl text-5xl font-extrabold text-slate-950 dark:text-white sm:text-6xl lg:text-7xl ${
                  isRtl ? "leading-[1.15]" : "leading-[0.95]"
                }`}
              >
                {t("companyName")}
                <span className={`mt-3 block text-gradient ${isRtl ? "pb-1" : ""}`}>
                  {t("heroHeadlineHighlight")}
                </span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-slate-600 dark:text-slate-200 sm:text-xl">
                {homeAboutBrief}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
                >
                  {t("contactUs")}
                  <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
                <a
                  href="#divisions"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/[0.82] px-7 py-4 text-sm font-extrabold text-slate-950 shadow-sm backdrop-blur transition-colors hover:bg-white dark:border-white/24 dark:bg-white/10 dark:text-white dark:hover:bg-white/16"
                >
                  {t("ourDivisions")}
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70">
                  {t("homeHeroPillLogistics")}
                </span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70">
                  {t("homeHeroPillTechnology")}
                </span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/70">
                  {t("homeHeroPillDelivery")}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-3xl dark:from-primary/25 dark:to-secondary/25" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/[0.09] dark:bg-white/[0.04] dark:shadow-[0_40px_80px_-32px_rgba(0,0,0,0.85)] dark:ring-1 dark:ring-inset dark:ring-white/[0.04]">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/[0.07] dark:bg-slate-900/60">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-primary">
                        {t("homeSnapshotEyebrow")}
                      </p>
                      <h3 className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">
                        {t("homeSnapshotTitle")}
                      </h3>
                    </div>
                    <div className="rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {t("homeSnapshotSupport")}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-white/10">
                          {stat.icon}
                        </div>
                        <div className="text-3xl font-extrabold text-slate-950 dark:text-white">{stat.value}</div>
                        <div className="mt-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                      {t("homeSnapshotProofTitle")}
                    </div>
                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
                      {t("homeSnapshotProofDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="divisions"
        className="relative overflow-hidden bg-white py-20 transition-colors dark:bg-slate-950 sm:py-24 lg:py-28"
      >
        <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(circle_at_12%_18%,rgba(0,166,81,0.12),transparent_36%),radial-gradient(circle_at_88%_72%,rgba(30,58,138,0.18),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 block text-sm font-extrabold uppercase text-primary">
                {t("homeDivisionsEyebrow")}
              </span>
              <h2 className="text-4xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-5xl">
                {t("ourDivisions")}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              {t("homeDivisionsImpactLabel")}
            </div>
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
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
                    <div className={`absolute start-4 top-4 h-11 w-11 rounded-xl ${div.accent} flex items-center justify-center text-white shadow-lg`}>
                      {React.cloneElement(div.icon as React.ReactElement, {
                        className: "h-5 w-5",
                      })}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
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
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      {t("learnMore")}
                      <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-20 transition-colors dark:border-slate-800 dark:bg-slate-950 sm:py-24">
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

      {/* Map Location Section */}
      <section className="border-y border-slate-200 bg-slate-50/70 py-20 transition-colors dark:border-slate-800 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-extrabold text-primary">
              <MapPin className="h-4 w-4" />
              {t("location")}
            </span>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-5xl">
              {t("dammamSaudiArabia")}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300">
              {t("contactMapDesc")}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
            <div className="group relative aspect-video w-full sm:aspect-[21/9]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.5139996!2d50.1241752!3d26.4526964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fba82967fb93%3A0x4d51e09c13d0590f!2z2LQYsdmD2Kkg2YXZhNUY0YQg2KfZhNix2YjYp9ivINin2YTYqtis2KfYsdmK2Kk!5e0!3m2!1sen!2ssa!4v1723267200000!5m2!1sen!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
              {/* Open in Maps overlay button */}
              <a
                href="https://maps.app.goo.gl/njvVUhNLGmk3Y7aW6"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 end-4 z-10 flex items-center gap-2 rounded-md bg-white/90 px-3 py-2 text-xs font-bold text-slate-900 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white dark:bg-slate-950/90 dark:text-white dark:hover:bg-slate-900"
              >
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {t("viewOnMap")}
              </a>
              <div className="pointer-events-none absolute inset-0 rounded-t-2xl ring-1 ring-inset ring-slate-900/10 dark:ring-white/10" />
            </div>
            
            <div className="grid grid-cols-1 divide-y divide-slate-200 dark:divide-slate-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t("navContact") || "Headquarters"}</div>
                  <div className="font-bold text-slate-950 dark:text-white">{t("dammamSaudiArabia")}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t("phoneTitle") || "Call Us"}</div>
                  <div className="font-bold text-slate-950 dark:text-white" dir="ltr">{t("phoneNumbers")}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{t("emailTitle") || "Email"}</div>
                  <div className="font-bold text-slate-950 dark:text-white">{t("email")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 pb-20 transition-colors dark:bg-slate-950 sm:px-8 sm:pb-24">
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
