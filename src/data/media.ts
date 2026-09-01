import type { Language } from "./translations";
import type { Localized } from "./organization";

/**
 * ============================================================================
 * PLACEHOLDER DATA — Company Media Gallery
 * ============================================================================
 * All photos and videos below are PLACEHOLDERS.
 *  - Images use Unsplash URLs — replace `src`/`thumbnail` with real assets
 *    (e.g. files placed in /public and referenced as "/media/xxx.jpg").
 *  - Videos use a public sample MP4 — replace `src` with the real video file
 *    or an external URL, and `thumbnail` with a real poster image.
 *
 * To add media: append an object to `mediaItems`.
 * Categories are configurable in `mediaCategories` below.
 * ============================================================================
 */

export type MediaType = "image" | "video";

export type MediaCategoryId =
  | "company"
  | "events"
  | "projects"
  | "team"
  | "offices"
  | "activities";

export interface MediaCategory {
  id: MediaCategoryId;
  label: Localized;
}

export interface MediaItem {
  id: string;
  type: MediaType;
  title: Localized;
  description: Localized;
  /** Poster/thumbnail image shown in grids and before video playback. */
  thumbnail: string;
  /** Full image URL (images) or video file/URL (videos). */
  src: string;
  /** Optional external player URL for YouTube/Vimeo videos. */
  embedUrl?: string;
  category: MediaCategoryId;
  featured?: boolean;
  /** Optional human-readable duration for videos, e.g. "2:14". */
  duration?: string;
  date?: string;
}

/** Configurable gallery categories. */
export const mediaCategories: MediaCategory[] = [
  { id: "company", label: { en: "Company", ar: "الشركة" } },
  { id: "events", label: { en: "Events", ar: "الفعاليات" } },
  { id: "projects", label: { en: "Projects", ar: "المشاريع" } },
  { id: "team", label: { en: "Team", ar: "الفريق" } },
  { id: "offices", label: { en: "Offices", ar: "المكاتب" } },
  { id: "activities", label: { en: "Activities", ar: "الأنشطة" } },
];

const img = (slug: string, w = 1200) =>
  `https://images.unsplash.com/${slug}?q=80&w=${w}&auto=format&fit=crop`;

// Public, stable sample video used as a PLACEHOLDER. Replace with real footage.
const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const mediaItems: MediaItem[] = [
  // ---- Videos ---------------------------------------------------------------
  {
    id: "media-001",
    type: "video",
    title: { en: "Company Overview", ar: "نبذة عن الشركة" },
    description: {
      en: "Company overview video.",
      ar: "فيديو تعريفي عن الشركة.",
    },
    thumbnail: "https://img.youtube.com/vi/60NkoxFxNVc/maxresdefault.jpg",
    src: SAMPLE_VIDEO,
    embedUrl: "https://www.youtube.com/embed/60NkoxFxNVc",
    category: "company",
    featured: true,
    duration: "2:14",
    date: "2026-01-15",
  },
  {
    id: "media-002",
    type: "video",
    title: { en: "Inside Our Operations", ar: "داخل عملياتنا" },
    description: {
      en: "Placeholder video showcasing day-to-day operations.",
      ar: "فيديو مؤقت يعرض العمليات اليومية.",
    },
    thumbnail: img("photo-1578575437130-527eed3abbec"),
    src: SAMPLE_VIDEO,
    category: "projects",
    duration: "1:38",
    date: "2026-02-02",
  },
  {
    id: "media-003",
    type: "video",
    title: { en: "Team Highlights", ar: "أبرز لحظات الفريق" },
    description: {
      en: "Placeholder video highlighting our people and culture.",
      ar: "فيديو مؤقت يبرز فريقنا وثقافتنا.",
    },
    thumbnail: img("photo-1522071820081-009f0129c71c"),
    src: SAMPLE_VIDEO,
    category: "team",
    duration: "0:52",
    date: "2026-03-10",
  },
  {
    id: "media-004",
    type: "video",
    title: { en: "Annual Event Recap", ar: "ملخص الفعالية السنوية" },
    description: {
      en: "Placeholder recap of a corporate event.",
      ar: "ملخص مؤقت لإحدى فعاليات الشركة.",
    },
    thumbnail: img("photo-1540575467063-178a50c2df87"),
    src: SAMPLE_VIDEO,
    category: "events",
    duration: "3:05",
    date: "2026-04-21",
  },
  // ---- Photos ---------------------------------------------------------------
  {
    id: "media-005",
    type: "image",
    title: { en: "Headquarters", ar: "المقر الرئيسي" },
    description: {
      en: "Placeholder office photo.",
      ar: "صورة مؤقتة للمكتب.",
    },
    thumbnail: img("photo-1497366754035-f200968a6e72", 800),
    src: img("photo-1497366754035-f200968a6e72", 1600),
    category: "offices",
    date: "2026-01-05",
  },
  {
    id: "media-006",
    type: "image",
    title: { en: "Team at Work", ar: "الفريق أثناء العمل" },
    description: { en: "Placeholder team photo.", ar: "صورة مؤقتة للفريق." },
    thumbnail: img("photo-1522071820081-009f0129c71c", 800),
    src: img("photo-1522071820081-009f0129c71c", 1600),
    category: "team",
    date: "2026-01-20",
  },
  {
    id: "media-007",
    type: "image",
    title: { en: "Project Site", ar: "موقع المشروع" },
    description: { en: "Placeholder project photo.", ar: "صورة مؤقتة للمشروع." },
    thumbnail: img("photo-1504307651254-35680f356dfd", 800),
    src: img("photo-1504307651254-35680f356dfd", 1600),
    category: "projects",
    date: "2026-02-14",
  },
  {
    id: "media-008",
    type: "image",
    title: { en: "Corporate Event", ar: "فعالية الشركة" },
    description: { en: "Placeholder event photo.", ar: "صورة مؤقتة للفعالية." },
    thumbnail: img("photo-1511578314322-379afb476865", 800),
    src: img("photo-1511578314322-379afb476865", 1600),
    category: "events",
    date: "2026-03-01",
  },
  {
    id: "media-009",
    type: "image",
    title: { en: "Logistics Fleet", ar: "أسطول الخدمات اللوجستية" },
    description: { en: "Placeholder company photo.", ar: "صورة مؤقتة للشركة." },
    thumbnail: img("photo-1601584115197-04ecc0da31d7", 800),
    src: img("photo-1601584115197-04ecc0da31d7", 1600),
    category: "company",
    date: "2026-03-18",
  },
  {
    id: "media-010",
    type: "image",
    title: { en: "Workshop Activity", ar: "نشاط ورشة العمل" },
    description: { en: "Placeholder activity photo.", ar: "صورة مؤقتة للنشاط." },
    thumbnail: img("photo-1552664730-d307ca884978", 800),
    src: img("photo-1552664730-d307ca884978", 1600),
    category: "activities",
    date: "2026-04-02",
  },
  {
    id: "media-011",
    type: "image",
    title: { en: "Meeting Room", ar: "قاعة الاجتماعات" },
    description: { en: "Placeholder office photo.", ar: "صورة مؤقتة للمكتب." },
    thumbnail: img("photo-1497366811353-6870744d04b2", 800),
    src: img("photo-1497366811353-6870744d04b2", 1600),
    category: "offices",
    date: "2026-04-15",
  },
  {
    id: "media-012",
    type: "image",
    title: { en: "Team Collaboration", ar: "تعاون الفريق" },
    description: { en: "Placeholder team photo.", ar: "صورة مؤقتة للفريق." },
    thumbnail: img("photo-1600880292203-757bb62b4baf", 800),
    src: img("photo-1600880292203-757bb62b4baf", 1600),
    category: "team",
    date: "2026-05-01",
  },
];

/** The single featured video (falls back to the first video). */
export const featuredMedia: MediaItem =
  mediaItems.find((m) => m.type === "video" && m.featured) ??
  mediaItems.find((m) => m.type === "video")!;

export const videoItems = mediaItems.filter((m) => m.type === "video");
export const imageItems = mediaItems.filter((m) => m.type === "image");

/** Helper: pick the correct language string. */
export const mloc = (value: Localized, language: Language): string =>
  value[language] || value.en;
