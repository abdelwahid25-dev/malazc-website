import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Clock, Play } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  featuredMedia,
  imageItems,
  mediaCategories,
  mloc,
  videoItems,
  type MediaCategoryId,
  type MediaItem,
} from "../data/media";
import { MediaViewer } from "../components/media/MediaViewer";

type CategoryFilter = MediaCategoryId | "all";

interface ViewerState {
  list: MediaItem[];
  index: number;
}

export default function Media() {
  const { language, t } = useLanguage();
  const [playFeatured, setPlayFeatured] = useState(false);
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const [category, setCategory] = useState<CategoryFilter>("all");

  const filteredImages = useMemo(
    () =>
      category === "all"
        ? imageItems
        : imageItems.filter((m) => m.category === category),
    [category],
  );

  // Only show category pills that actually contain photos.
  const availableCategories = useMemo(
    () =>
      mediaCategories.filter((c) =>
        imageItems.some((m) => m.category === c.id),
      ),
    [],
  );

  const openViewer = (list: MediaItem[], item: MediaItem) =>
    setViewer({ list, index: list.indexOf(item) });

  return (
    <div className="bg-white transition-colors dark:bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 dark:border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-slate-950/68" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <span className="mb-5 inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-extrabold uppercase text-primary backdrop-blur">
            {t("mediaEyebrow")}
          </span>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white sm:text-6xl">
            {t("mediaTitle")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("mediaSubtitle")}
          </p>
          <p className="mt-4 max-w-3xl text-sm font-medium text-slate-400">
            {t("mediaPlaceholderNote")}
          </p>
        </div>
      </section>

      {/* Featured video */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8">
            <span className="mb-3 block text-sm font-extrabold uppercase text-primary">
              {t("mediaFeaturedTitle")}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">
              {mloc(featuredMedia.title, language)}
            </h2>
          </div>

          <div className="elevated-surface relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl dark:border-slate-800">
            <div className="relative aspect-video w-full">
              {playFeatured ? (
                featuredMedia.embedUrl ? (
                  <iframe
                    src={featuredMedia.embedUrl}
                    title={mloc(featuredMedia.title, language)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0 bg-black"
                  />
                ) : (
                  <video
                    src={featuredMedia.src}
                    poster={featuredMedia.thumbnail}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 h-full w-full bg-black"
                  />
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setPlayFeatured(true)}
                  aria-label={t("mediaPlay")}
                  className="group absolute inset-0 h-full w-full"
                >
                  <img
                    src={featuredMedia.thumbnail}
                    alt={mloc(featuredMedia.title, language)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-slate-950/40 transition-colors group-hover:bg-slate-950/30" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-white shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
                    </span>
                  </span>
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1 p-6">
              <p className="text-base font-medium leading-7 text-slate-300">
                {mloc(featuredMedia.description, language)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary video library — enable when more videos are available. */}
      {/* todo: enable when more videos are available */}
      {false && videoItems.length > 0 && (
        <section className="surface-grid border-y border-slate-200 bg-slate-50 py-20 transition-colors dark:border-slate-800 dark:bg-slate-900/60 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10">
              <span className="mb-4 block text-sm font-extrabold uppercase text-primary">
                {t("mediaVideosTitle")}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">
                {t("mediaVideosSubtitle")}
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videoItems.map((item, i) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  index={i}
                  onOpen={() => openViewer(videoItems, item)}
                  isVideo
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo gallery */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8">
            <span className="mb-4 block text-sm font-extrabold uppercase text-primary">
              {t("mediaGalleryTitle")}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white sm:text-4xl">
              {t("mediaGallerySubtitle")}
            </h2>
          </div>

          {/* Category filter */}
          <div
            role="tablist"
            aria-label={t("mediaGalleryTitle")}
            className="mb-10 flex flex-wrap gap-2"
          >
            <FilterPill
              active={category === "all"}
              onClick={() => setCategory("all")}
            >
              {t("mediaFilterAll")}
            </FilterPill>
            {availableCategories.map((c) => (
              <FilterPill
                key={c.id}
                active={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {mloc(c.label, language)}
              </FilterPill>
            ))}
          </div>

          {filteredImages.length === 0 ? (
            <p className="py-10 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
              {t("mediaEmpty")}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {filteredImages.map((item, i) => (
                <MediaCard
                  key={item.id}
                  item={item}
                  index={i}
                  onOpen={() => openViewer(filteredImages, item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <MediaViewer
        items={viewer?.list ?? []}
        index={viewer?.index ?? null}
        onClose={() => setViewer(null)}
        onNavigate={(next) =>
          setViewer((v) => (v ? { ...v, index: next } : v))
        }
      />
    </div>
  );
}

const MediaCard: React.FC<{
  item: MediaItem;
  index: number;
  onOpen: () => void;
  isVideo?: boolean;
}> = ({ item, index, onOpen, isVideo = false }) => {
  const { language, t } = useLanguage();
  const category = mediaCategories.find((c) => c.id === item.category);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
      aria-label={
        isVideo
          ? `${t("mediaPlay")}: ${mloc(item.title, language)}`
          : mloc(item.title, language)
      }
      className="group elevated-surface relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white text-start transition-all hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.thumbnail}
          alt={mloc(item.title, language)}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
        {category && (
          <span className="absolute start-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-800 backdrop-blur dark:bg-slate-950/80 dark:text-slate-200">
            {mloc(category.label, language)}
          </span>
        )}
        {isVideo && (
          <>
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white shadow-xl transition-transform group-hover:scale-110">
                <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
              </span>
            </span>
            {item.duration && (
              <span className="absolute end-3 bottom-3 inline-flex items-center gap-1 rounded bg-slate-950/80 px-2 py-1 text-xs font-bold text-white">
                <Clock className="h-3 w-3" />
                <span dir="ltr">{item.duration}</span>
              </span>
            )}
          </>
        )}
      </div>
      {isVideo && (
        <div className="p-4">
          <h3 className="truncate text-base font-extrabold text-slate-950 dark:text-white">
            {mloc(item.title, language)}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">
            {mloc(item.description, language)}
          </p>
        </div>
      )}
    </motion.button>
  );
};

const FilterPill: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={`rounded-full px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
      active
        ? "bg-primary text-white shadow-sm"
        : "border border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
    }`}
  >
    {children}
  </button>
);
