import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { loc, type Employee } from "../../data/organization";
import { BusinessCardView } from "./BusinessCardView";

interface BusinessCardModalProps {
  employee: Employee | null;
  onClose: () => void;
}

/** Shows an employee's business card in a dialog stacked above the profile dialog. */
export const BusinessCardModal: React.FC<BusinessCardModalProps> = ({
  employee,
  onClose,
}) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    if (!employee) return;
    // Capture phase so Escape closes only this dialog, not the profile dialog beneath it.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [employee, onClose]);

  return createPortal(
    <AnimatePresence>
      {employee && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[110] overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={loc(employee.name, language)}
        >
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative flex min-h-full items-start justify-center px-4 py-6 sm:items-center">
            <div className="relative w-full max-w-md">
              <button
                type="button"
                onClick={onClose}
                aria-label={t("cardClose")}
                className="absolute -top-3 end-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:-top-4"
              >
                <X className="h-4 w-4" />
              </button>
              <BusinessCardView employee={employee} linkLogo={false} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
