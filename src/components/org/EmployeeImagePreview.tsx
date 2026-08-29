import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface EmployeeImagePreviewProps {
  src: string | null | undefined;
  name: string;
  onClose: () => void;
  keepBodyLocked?: boolean;
}

/** Full-size portrait preview, mounted only when a valid photo is selected. */
export const EmployeeImagePreview: React.FC<EmployeeImagePreviewProps> = ({
  src,
  name,
  onClose,
  keepBodyLocked = false,
}) => {
  useEffect(() => {
    if (!src) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (!keepBodyLocked) document.body.style.overflow = "";
    };
  }, [keepBodyLocked, onClose, src]);

  const { t } = useLanguage();

  return createPortal(
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-5"
          role="dialog"
          aria-modal="true"
          aria-label={name}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t("mediaClose")}
            className="absolute inset-0 cursor-default bg-slate-950/85 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative z-10"
          >
            <img
              src={src}
              alt={name}
              className="max-h-[78vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t("mediaClose")}
              className="absolute end-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-slate-950/70 text-white transition-colors hover:bg-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
