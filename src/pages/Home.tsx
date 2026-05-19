import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  ArrowRight,
  Truck,
  Laptop,
  HardHat,
  TrendingUp,
  Target,
  Flag,
  ChevronRight,
  CheckCircle2,
  Globe,
  Users,
  Award,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Home() {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const stats = [
    { label: isRtl ? "سنوات من التميز" : "Years of Excellence", value: "10+", icon: <Award className="w-5 h-5" /> },
    { label: isRtl ? "مشروع مكتمل" : "Successful Projects", value: "500+", icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: isRtl ? "عميل سعيد" : "Happy Clients", value: "200+", icon: <Users className="w-5 h-5" /> },
    { label: isRtl ? "مدينة مغطاة" : "Cities Covered", value: "15+", icon: <Globe className="w-5 h-5" /> },
  ];

  const divisions = [
    {
      id: "logistics",
      title: t("navLogistics"),
      desc: t("logisticsFeatures"),
      icon: <Truck />,
      path: "/logistics",
      color: "from-blue-600 to-indigo-700",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop",
      span: "md:col-span-2",
    },
    {
      id: "it",
      title: t("navIT"),
      desc: t("itFeatures"),
      icon: <Laptop />,
      path: "/it",
      color: "from-emerald-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      span: "md:col-span-1",
    },
    {
      id: "contracting",
      title: t("navContracting"),
      desc: t("contractingFeatures"),
      icon: <HardHat />,
      path: "/contracting",
      color: "from-amber-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
      span: "md:col-span-1",
    },
    {
      id: "marketing",
      title: t("navMarketing"),
      desc: t("marketingFeatures"),
      icon: <TrendingUp />,
      path: "/marketing",
      color: "from-purple-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      span: "md:col-span-2",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-start flex-1"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-700 leading-[1.2] mb-6 tracking-tight">
              {t("heroHeadline").split("–")[0]}
              <span className="block mt-2 text-primary font-bold">
                {t("heroHeadline").split("–")[1]?.trim() || t("companyName")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t("homeSubheadline")}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/contact"
                className="group relative px-10 py-3.5 bg-primary text-white rounded font-bold transition-all hover:bg-primary-hover shadow-md hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("contactUs")}
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full relative max-w-md lg:max-w-xl mx-auto"
          >
            <img
              src="https://illustrations.popsy.co/green/web-design.svg"
              alt="Web Development Illustration"
              className="w-full h-auto drop-shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Divisions Section */}
      <section id="divisions" className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-20 flex flex-col items-center md:items-start text-center md:text-start">
            <span className="text-primary font-black uppercase tracking-widest text-sm mb-4">
              {isRtl ? "ماذا نفعل" : "Services We Provide"}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              {t("ourDivisions")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {divisions.map((div, i) => (
              <motion.div
                key={div.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={div.span}
              >
                <Link
                  to={div.path}
                  className="group relative h-[400px] flex flex-col justify-end p-10 rounded-[3rem] overflow-hidden overflow-hidden shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-700 hover:-translate-y-2 border border-slate-100"
                >
                  {/* Background Image with Hover Scale */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={div.image}
                      alt={div.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 transition-opacity group-hover:opacity-90`} />
                    <div className={`absolute inset-0 bg-gradient-to-br ${div.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700`} />
                  </div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-white group-hover:text-slate-900 transition-all transform group-hover:rotate-6">
                      {React.cloneElement(div.icon as React.ReactElement, { className: "w-7 h-7" })}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">
                      {div.title}
                    </h3>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                      {div.desc}
                    </p>
                    <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-[0.2em]">
                      {t("readMore")}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-2" : "group-hover:translate-x-2"}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern About Section - Split Graphic */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, rotate: -2 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative z-20 aspect-square rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-8 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                  alt="Modern Office"
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              
              {/* Overlapping Info Card */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className={`absolute -bottom-10 ${isRtl ? "-left-10" : "-right-10"} z-30 p-8 bg-white rounded-[2.5rem] shadow-2xl max-w-xs border border-slate-100`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-slate-900 tracking-tight">{isRtl ? "موثوق محلياً" : "Trusted Locally"}</div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  {isRtl ? "نحن نبني الشراكات القوية من خلال التفاني في التميز." : "We build strong partnerships through dedication to excellence."}
                </p>
              </motion.div>

              {/* Decorative Circle */}
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-start">
              <span className="px-4 py-1 rounded-full bg-secondary/10 text-secondary font-black text-xs uppercase tracking-widest mb-8">
                {t("navAbout")}
              </span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] mb-8 tracking-tighter">
                {t("companyName")}
                <span className="text-primary">.</span>
              </h2>
              <div className="w-20 h-2 bg-primary rounded-full mb-10 mx-auto lg:mx-0" />
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-12 font-medium">
                {t("aboutBrief")}
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mb-12 w-full">
                <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-rotate-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                    {t("visionTitle")}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t("visionDesc")}
                  </p>
                </div>
                <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:bg-secondary group-hover:text-white transition-all transform group-hover:rotate-6">
                    <Flag className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
                    {t("missionTitle")}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t("missionDesc")}
                  </p>
                </div>
              </div>

              <Link
                to="/about"
                className="group flex items-center gap-4 text-slate-900 font-black text-lg uppercase tracking-tight hover:text-primary transition-colors"
              >
                {t("learnMore")}
                <div className="w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className={`w-5 h-5 transition-transform ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Panel */}
      <section className="py-32 px-6 sm:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[4rem] group">
            <div className="absolute inset-0 bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                alt="Architecture"
                className="w-full h-full object-cover opacity-20 transition-transform duration-10k group-hover:scale-110"
              />
            </div>
            
            <div className="relative z-10 p-16 md:p-24 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl"
              >
                <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tight leading-none">
                  {isRtl ? "جاهز لبناء مستقبلك الرقمي والواقعي معنا؟" : "Ready to Build Your Digital and Physical Future?"}
                </h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    to="/contact"
                    className="px-12 py-5 bg-secondary text-white rounded-2xl font-black text-xl hover:bg-secondary-hover hover:scale-105 transition-all shadow-2xl shadow-secondary/20"
                  >
                    {t("contactUs")}
                  </Link>
                  <Link
                    to="/about"
                    className="px-12 py-5 bg-transparent text-white border-2 border-white/30 rounded-2xl font-black text-xl hover:bg-white/10 transition-all"
                  >
                    {isRtl ? "شاهد عرضنا" : "View Portfolio"}
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full animate-bounce opacity-20" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full animate-pulse opacity-10" />
          </div>
        </div>
      </section>
    </div>
  );
}
