import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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

  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error" | "mailto"
  >("idle");
  const [phoneError, setPhoneError] = React.useState(false);

  const validatePhone = (value: string) => {
    const cleanPhone = value.replace(/[\s()-]/g, "");
    const phoneRegex = /^(\+?[0-9]{7,15})$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      setPhoneError(true);
      return false;
    }
    setPhoneError(false);
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "phone") {
      const cleanPhone = value.replace(/[\s()-]/g, "");
      const phoneRegex = /^(\+?[0-9]{7,15})$/;
      if (cleanPhone && phoneRegex.test(cleanPhone)) {
        setPhoneError(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPhoneValid = validatePhone(formData.phone);
    if (!isPhoneValid) {
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setStatus("sending");

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (
      accessKey &&
      accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY_HERE" &&
      accessKey.trim() !== ""
    ) {
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
            to_email: "husam.dafallh@malazc.com",
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus("success");
          setFormData({
            name: "",
            phone: "",
            email: "",
            division: "",
            message: "",
          });
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

      const subject = encodeURIComponent(
        `Contact Form: ${formData.division || "General Enquiry"}`,
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
          `Phone: ${formData.phone}\n` +
          `Email: ${formData.email}\n` +
          `Division: ${formData.division}\n\n` +
          `Message:\n${formData.message}`,
      );

      window.location.href = `mailto:husam.dafallh@malazc.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          division: "",
          message: "",
        });
      }, 2000);
    }
  };

  const labelClass = "mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200";
  const inputClass =
    "w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500";

  return (
    <div className="bg-white transition-colors dark:bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 dark:border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070&auto=format&fit=crop"
          alt={t("contactHeroImageAlt")}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.38]"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <span className="mb-5 inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-extrabold uppercase text-primary backdrop-blur">
            {t("navContact")}
          </span>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white sm:text-6xl">
            {t("contactTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-200">
            {t("contactDesc")}
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-4">
            <div className="elevated-surface rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
                {t("location")}
              </h3>
              <p className="mt-2 font-medium text-slate-600 dark:text-slate-300">
                {t("riyadhSaudiArabia")}
              </p>
            </div>

            <div className="elevated-surface rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-secondary/10 text-secondary dark:bg-primary/10 dark:text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
                {t("phoneTitle")}
              </h3>
              <p className="mt-2 font-medium text-slate-600 dark:text-slate-300" dir="ltr">
                {t("phoneNumbers")}
              </p>
              <a
                href="https://wa.me/966581117181"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-primary-hover"
              >
                <MessageCircle className="h-4 w-4" />
                {t("whatsappText")}
              </a>
            </div>

            <div className="elevated-surface rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-amber-500/10 text-amber-500">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-950 dark:text-white">
                {t("emailTitle")}
              </h3>
              <p className="mt-2 font-medium text-slate-600 dark:text-slate-300">
                {t("email")}
              </p>
            </div>
          </div>

          <div className="elevated-surface rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status === "success" && (
                <div className="flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-200">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <div>
                    <h4 className="font-extrabold text-green-900 dark:text-green-100">
                      {t("formSuccessTitle")}
                    </h4>
                    <p className="mt-1 text-sm font-medium text-green-700 dark:text-green-200">
                      {t("formSuccessDesc")}
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <h4 className="font-extrabold text-red-900 dark:text-red-100">
                      {t("formErrorTitle")}
                    </h4>
                    <p className="mt-1 text-sm font-medium text-red-700 dark:text-red-200">
                      {t("formErrorDesc")}
                    </p>
                  </div>
                </div>
              )}

              {status === "mailto" && (
                <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                  <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-amber-600" />
                  <div>
                    <h4 className="font-extrabold text-amber-900 dark:text-amber-100">
                      {t("formSending")}
                    </h4>
                    <p className="mt-1 text-sm font-medium text-amber-700 dark:text-amber-200">
                      {t("formMailtoDesc")}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>{t("formName")}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === "sending" || status === "mailto"}
                    className={inputClass}
                    placeholder={t("formName")}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t("formPhone")}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={(e) => validatePhone(e.target.value)}
                    required
                    disabled={status === "sending" || status === "mailto"}
                    className={`${inputClass} ${
                      phoneError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : ""
                    } ${isRtl ? "text-right" : "text-left"}`}
                    placeholder={t("formPhone")}
                    dir="ltr"
                  />
                  {phoneError && (
                    <p className="mt-2 text-xs font-bold text-red-500">
                      {t("formPhoneError")}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>{t("formEmail")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={status === "sending" || status === "mailto"}
                  className={inputClass}
                  placeholder={t("formEmail")}
                />
              </div>

              <div>
                <label className={labelClass}>{t("formDivision")}</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  disabled={status === "sending" || status === "mailto"}
                  className={inputClass}
                >
                  <option value="">{t("formDivision")}</option>
                  <option value="logistics">{t("navLogistics")}</option>
                  <option value="it">{t("navIT")}</option>
                  <option value="contracting">{t("navContracting")}</option>
                  <option value="marketing">{t("navMarketing")}</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>{t("formMessage")}</label>
                <textarea
                  rows={6}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === "sending" || status === "mailto"}
                  className={`${inputClass} resize-none`}
                  placeholder={t("formMessage")}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "mailto"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-secondary/15 transition-all hover:-translate-y-0.5 hover:bg-secondary-hover disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t("formSending")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("formSubmit")}</span>
                    <Send className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-950 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=2070&auto=format&fit=crop"
              alt={t("contactMapImageAlt")}
              className="h-80 w-full object-cover opacity-[0.48]"
            />
            <div className="absolute inset-0 bg-slate-950/35" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-lg font-extrabold">{t("riyadhSaudiArabia")}</p>
                  <p className="text-sm font-medium text-slate-300">
                    {t("contactMapDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
