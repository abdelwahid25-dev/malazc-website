import React, { useEffect, useState } from "react";
import { renderBusinessCardImage } from "../utils/businessCardImage";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  ImageDown,
  Globe,
  Link2,
  Mail,
  MapPin,
  MessageCircle,
  Loader2,
  Phone,
  UserPlus,
  UserRound,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  departments,
  getEmployeeBySlug,
  loc,
  type Employee,
} from "../data/organization";

const COMPANY_PHONE = "+966 58 111 7181";
const COMPANY_EMAIL = "info@malazc.com";

const digits = (value: string) => value.replace(/[^\d+]/g, "");

const escapeVCard = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const buildVCard = (
  employee: Employee,
  phone: string,
  email: string,
  url: string,
  company: string,
  address: string,
) => {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCard(employee.name.en)}`,
    `N:;${escapeVCard(employee.name.en)};;;`,
    `ORG:${escapeVCard(company)}`,
    `TITLE:${escapeVCard(employee.position.en)}`,
    `TEL;TYPE=CELL,VOICE:${digits(phone)}`,
    `EMAIL;TYPE=WORK:${email}`,
    `URL:${url}`,
    `ADR;TYPE=WORK:;;${escapeVCard(address)};;;;`,
  ];
  if (employee.image) lines.push(`PHOTO;VALUE=uri:${employee.image}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
};

const ActionButton: React.FC<{
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}> = ({ href, onClick, icon, label, external }) => {
  const className =
    "flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-bold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200";
  if (href) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {icon}
        {label}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {icon}
      {label}
    </button>
  );
};

const InfoRow: React.FC<{
  href?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  ltr?: boolean;
}> = ({ href, icon, children, ltr }) => {
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </span>
      <span
        dir={ltr ? "ltr" : undefined}
        className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800 dark:text-slate-100"
      >
        {children}
      </span>
    </>
  );
  const className = "flex items-center gap-3 py-2.5";
  return href ? (
    <a href={href} className={`${className} hover:text-primary`}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

/** Standalone, mobile-first digital business card — meant to be opened from an NFC tag or QR code. */
const BusinessCard: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language, setLanguage, t } = useLanguage();
  const employee = getEmployeeBySlug(slug);
  const [copied, setCopied] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [savingImage, setSavingImage] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [slug]);

  useEffect(() => {
    const previous = document.title;
    if (employee) {
      document.title = `${loc(employee.name, language)} | ${t("companyName")}`;
    }
    return () => {
      document.title = previous;
    };
  }, [employee, language, t]);

  const languageToggle = (
    <button
      type="button"
      onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
      className="absolute end-4 top-4 z-10 rounded-md bg-white/20 px-3 py-1.5 text-xs font-bold text-white backdrop-blur transition-colors hover:bg-white/30"
    >
      {language === "ar" ? "English" : "العربية"}
    </button>
  );

  if (!employee) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center dark:bg-slate-950">
        <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">
          {t("cardNotFoundTitle")}
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {t("cardNotFoundDesc")}
        </p>
        <Link
          to="/"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-hover"
        >
          {t("cardBackHome")}
        </Link>
      </main>
    );
  }

  const name = loc(employee.name, language);
  const position = loc(employee.position, language);
  const department = departments.find((d) => d.id === employee.departmentId);
  const phone = employee.phone ?? COMPANY_PHONE;
  const email = employee.email ?? COMPANY_EMAIL;
  const siteUrl = window.location.origin;
  const cardUrl = `${siteUrl}/business-card/${employee.slug}`;
  const showImage = employee.image && !imageFailed;

  const saveContact = () => {
    const vcf = buildVCard(
      employee,
      phone,
      email,
      siteUrl,
      `${t("companyName")} - ${t("companyNameAlt")}`,
      t("location"),
    );
    const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${employee.slug}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Draws the card to a PNG. On phones the native share sheet offers "Save Image"
  // (gallery); elsewhere the file is downloaded.
  const saveImage = async () => {
    if (savingImage) return;
    setSavingImage(true);
    try {
      const blob = await renderBusinessCardImage({
        name,
        position,
        department: department ? loc(department.name, language) : undefined,
        about: loc(employee.description, language),
        phone,
        email,
        website: window.location.host,
        address: t("location"),
        companyName: t("companyName"),
        companyNameAlt: t("companyNameAlt"),
        imageUrl: employee.image,
        language,
        isDark: document.documentElement.classList.contains("dark"),
      });
      const file = new File([blob], `${employee.slug}-business-card.png`, {
        type: "image/png",
      });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: name });
          return;
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") return;
        }
      }
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setSavingImage(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t("cardCopyLink"), cardUrl);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 dark:bg-slate-950 sm:py-10">
      <article className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="gradient-primary relative px-6 pb-16 pt-6 text-white">
          {languageToggle}
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
              <svg viewBox="0 0 100 100" fill="none" className="h-7 w-7">
                <polygon points="0,0 0,100 47,50" fill="#1E3A8A" />
                <polygon points="100,0 100,100 53,50" fill="#00A651" />
              </svg>
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-extrabold uppercase">
                {t("companyName")}
              </span>
              <span className="text-xs font-semibold text-white/80">
                {t("companyNameAlt")}
              </span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 -mt-12 flex flex-col items-center px-6 text-center">
          {showImage ? (
            <img
              src={employee.image ?? undefined}
              alt={name}
              onError={() => setImageFailed(true)}
              className="h-28 w-28 rounded-full border-4 border-white object-cover object-top shadow-lg dark:border-slate-900"
            />
          ) : (
            <span
              aria-label={name}
              className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-primary/10 text-primary shadow-lg dark:border-slate-900"
            >
              <UserRound className="h-12 w-12" />
            </span>
          )}
          <h1 className="mt-4 text-2xl font-extrabold text-slate-950 dark:text-white">
            {name}
          </h1>
          <p className="mt-1 text-sm font-bold text-primary">{position}</p>
          {department && (
            <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {loc(department.name, language)}
            </p>
          )}
        </div>

        <div className="px-6 pt-5">
          <div className="mb-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
            {t("orgBioLabel")}
          </div>
          <p className="text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
            {loc(employee.description, language)}
          </p>
        </div>

        <div className="flex gap-2 px-6 pt-6">
          <ActionButton
            href={`tel:${digits(phone)}`}
            icon={<Phone className="h-5 w-5" />}
            label={t("cardCall")}
          />
          <ActionButton
            href={`https://wa.me/${digits(phone).replace("+", "")}`}
            external
            icon={<MessageCircle className="h-5 w-5" />}
            label={t("cardWhatsapp")}
          />
          <ActionButton
            href={`mailto:${email}`}
            icon={<Mail className="h-5 w-5" />}
            label={t("cardEmail")}
          />
        </div>

        <div className="divide-y divide-slate-100 px-6 py-4 dark:divide-slate-800">
          <InfoRow href={`tel:${digits(phone)}`} icon={<Phone className="h-4 w-4" />} ltr>
            {phone}
          </InfoRow>
          <InfoRow href={`mailto:${email}`} icon={<Mail className="h-4 w-4" />} ltr>
            {email}
          </InfoRow>
          <InfoRow href={siteUrl} icon={<Globe className="h-4 w-4" />} ltr>
            {window.location.host}
          </InfoRow>
          <InfoRow icon={<MapPin className="h-4 w-4" />}>{t("location")}</InfoRow>
        </div>

        <div className="flex flex-col gap-2 px-6 pb-6">
          <button
            type="button"
            onClick={saveContact}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <UserPlus className="h-4 w-4" />
            {t("cardSaveContact")}
          </button>
          <button
            type="button"
            onClick={saveImage}
            disabled={savingImage}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-60 dark:border-slate-800 dark:text-slate-200"
          >
            {savingImage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImageDown className="h-4 w-4" />
            )}
            {t("cardSaveImage")}
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:text-slate-200"
          >
            {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            {copied ? t("cardLinkCopied") : t("cardCopyLink")}
          </button>
        </div>
      </article>
      <p className="mt-4 text-center">
        <Link
          to="/"
          className="text-xs font-bold text-slate-500 hover:text-primary dark:text-slate-400"
        >
          {t("cardVisitWebsite")}
        </Link>
      </p>
    </main>
  );
};

export default BusinessCard;
