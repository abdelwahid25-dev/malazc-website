import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";

export default function Contact() {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <section className="bg-[#F9FAFB] py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start relative z-10">
          <span className="inline-block px-3 py-1 mb-4 rounded-full bg-green-50 border border-green-100 text-primary text-xs font-bold uppercase tracking-wider">
            {t("navContact")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
            {t("contactTitle")}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl leading-relaxed italic">
            {t("contactDesc")}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">
                  {t("location")}
                </h3>
                <p className="text-slate-500">Riyadh, Saudi Arabia</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Phone</h3>
                <p className="text-slate-500" dir="ltr">
                  {t("phoneNumbers")}
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-amber-500 font-medium hover:text-amber-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t("whatsappText")}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Email</h3>
                <p className="text-slate-500">{t("email")}</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 h-full">
                <form
                  className="space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("formName")}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50"
                        placeholder={t("formName")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("formPhone")}
                      </label>
                      <input
                        type="tel"
                        className={`w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 ${isRtl ? "text-right" : "text-left"}`}
                        placeholder={t("formPhone")}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("formEmail")}
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50"
                      placeholder={t("formEmail")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("formDivision")}
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 appearance-none">
                      <option value="">{t("formDivision")}</option>
                      <option value="logistics">{t("navLogistics")}</option>
                      <option value="it">{t("navIT")}</option>
                      <option value="contracting">{t("navContracting")}</option>
                      <option value="marketing">{t("navMarketing")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("formMessage")}
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 resize-none"
                      placeholder={t("formMessage")}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>{t("formSubmit")}</span>
                    <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map (Placeholder) */}
          <div className="mt-16 rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-96 bg-gray-200 relative">
            <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
              <MapPin className="w-12 h-12 mb-4 text-gray-400" />
              <p className="font-medium text-lg">Interactive Map View</p>
              <p className="text-sm">Riyadh, Saudi Arabia</p>
            </div>
            {/* Real implementation would use an iframe google map here */}
          </div>
        </div>
      </section>
    </div>
  );
}
