import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { mloc, type MediaItem } from "../../data/media";

interface MediaViewerProps {
  items: MediaItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

/**
 * Accessible viewer for both images and videos.
 * - Images: shows the full-resolution image with prev/next navigation.
 * - Videos: renders a native <video controls> element (mounted only while open,
 *   so nothing loads until the user opens it). No autoplay with sound.
 * Keyboard: Esc closes, ArrowLeft/ArrowRight navigate (direction-aware for RTL).
 */
export const MediaViewer: React.FC<MediaViewerProps> = ({
  items,
  index,
  onClose,
  onNavigate,
}) => {
  const { language, t } = useLanguage();
  const isRtl = language === "ar";
  const isOpen = index !== null;
  const current = isOpen ? items[index] : null;

  const go = useCallback(
    (dir: number) => {
      if (index === null || items.length === 0) return;
      const next = (index + dir + items.length) % items.length;
      onNavigate(next);
    },
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(isRtl ? -1 : 1);
      else if (e.key === "ArrowLeft") go(isRtl ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, go, isRtl, onClose]);

  const showNav = items.length > 1;

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={mloc(current.title, language)}
        >
          <div
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label={t("mediaClose")}
            className="absolute end-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev / Next */}
          {showNav && (
            <>
              <button
                type="button"
                onClick={() => go(isRtl ? 1 : -1)}
                aria-label={t("mediaPrev")}
                className="absolute start-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:start-6"
              >
                {isRtl ? (
                  <ChevronRight className="h-6 w-6" />
                ) : (
                  <ChevronLeft className="h-6 w-6" />
                )}
              </button>
              <button
                type="button"
                onClick={() => go(isRtl ? -1 : 1)}
                aria-label={t("mediaNext")}
                className="absolute end-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:end-6"
              >
                {isRtl ? (
                  <ChevronLeft className="h-6 w-6" />
                ) : (
                  <ChevronRight className="h-6 w-6" />
                )}
              </button>
            </>
          )}

          {/* Content */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 flex max-h-full w-full max-w-5xl flex-col items-center"
          >
            {current.type === "image" ? (
              <img
                src={current.src}
                alt={mloc(current.title, language)}
                className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
            ) : (
              <video
                key={current.src}
                src={current.src}
                poster={current.thumbnail}
                controls
                playsInline
                preload="metadata"
                className="max-h-[78vh] w-full rounded-lg bg-black shadow-2xl"
              >
                {mloc(current.title, language)}
              </video>
            )}

            <div className="mt-4 w-full max-w-3xl text-center">
              <h3 className="text-lg font-extrabold text-white">
                {mloc(current.title, language)}
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-300">
                {mloc(current.description, language)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
