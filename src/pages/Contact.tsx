import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { MapPin, Phone, Mail, Send, MessageCircle, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    division: "",
    message: "",
  });

  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error" | "mailto">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus("sending");

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (accessKey && accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE" && accessKey.trim() !== "") {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Contact Form Submission from ${formData.name}`,
            from_name: formData.name,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            division: formData.division,
            message: formData.message,
            to_email: "husam.dafallh@malazc.com"
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus("success");
          setFormData({ name: "", phone: "", email: "", division: "", message: "" });
        } else {
          console.error("Web3Forms error:", result);
          setStatus("error");
        }
      } catch (error) {
        console.error("Submission error:", error);
        setStatus("error");
      }
    } else {
      setStatus("mailto");

      const subject = encodeURIComponent(`Contact Form: ${formData.division || "General Enquiry"}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Division: ${formData.division}\n\n` +
        `Message:\n${formData.message}`
      );

      window.location.href = `mailto:husam.dafallh@malazc.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", division: "", message: "" });
      }, 2000);
    }
  };

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
                    href="https://wa.me/966581117181"
                    target="_blank"
                    rel="noopener noreferrer"
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
                  onSubmit={handleSubmit}
                >
                  {status === "success" && (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-green-900">{t("formSuccessTitle")}</h4>
                        <p className="text-sm text-green-700 mt-1">{t("formSuccessDesc")}</p>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-900">{t("formErrorTitle")}</h4>
                        <p className="text-sm text-red-700 mt-1">{t("formErrorDesc")}</p>
                      </div>
                    </div>
                  )}

                  {status === "mailto" && (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-3">
                      <Loader2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-spin" />
                      <div>
                        <h4 className="font-bold text-amber-900">{t("formSending")}</h4>
                        <p className="text-sm text-amber-700 mt-1">{t("formMailtoDesc")}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("formName")}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={status === "sending" || status === "mailto"}
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
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={status === "sending" || status === "mailto"}
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === "sending" || status === "mailto"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50"
                      placeholder={t("formEmail")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("formDivision")}
                    </label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      disabled={status === "sending" || status === "mailto"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 appearance-none bg-no-repeat bg-[right_1.25rem_center] bg-[length:1em]"
                    >
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
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={status === "sending" || status === "mailto"}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-slate-50/50 resize-none"
                      placeholder={t("formMessage")}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending" || status === "mailto"}
                    className="w-full py-4 rounded-xl bg-amber-500 text-white font-bold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{t("formSending")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t("formSubmit")}</span>
                        <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
                      </>
                    )}
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
