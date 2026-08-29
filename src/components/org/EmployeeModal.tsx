import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { Mail, Phone, Linkedin, X, Building2, GitBranch } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import {
  departments,
  getEmployee,
  loc,
  type Employee,
} from "../../data/organization";

interface EmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
}

/** Accessible profile dialog for a single employee. */
export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  employee,
  onClose,
}) => {
  const { language, t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!employee) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [employee, onClose]);

  const manager = getEmployee(employee?.managerId ?? null);
  const department = departments.find((d) => d.id === employee?.departmentId);

  return createPortal(
    <AnimatePresence>
      {employee && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={loc(employee.name, language)}
        >
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:rounded-2xl"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t("orgCloseProfile")}
              className="absolute end-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white/90 text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 px-6 pb-6 pt-8 dark:from-secondary/20 dark:to-primary/15">
              <div className="flex items-center gap-4">
                <img
                  src={employee.image}
                  alt={loc(employee.name, language)}
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-white shadow-lg dark:ring-slate-900"
                />
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-extrabold text-slate-950 dark:text-white">
                    {loc(employee.name, language)}
                  </h3>
                  <p className="truncate text-sm font-bold text-primary">
                    {loc(employee.position, language)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <Building2 className="h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      {t("orgDepartmentLabel")}
                    </div>
                    <div className="truncate text-sm font-bold text-slate-950 dark:text-white">
                      {department ? loc(department.name, language) : "—"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <GitBranch className="h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                      {t("orgReportsTo")}
                    </div>
                    <div className="truncate text-sm font-bold text-slate-950 dark:text-white">
                      {manager ? loc(manager.name, language) : t("orgNoManager")}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-1 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                  {t("orgBioLabel")}
                </div>
                <p className="text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">
                  {loc(employee.description, language)}
                </p>
              </div>

              {(employee.email || employee.phone || employee.linkedin) && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {employee.email && (
                    <a
                      href={`mailto:${employee.email}`}
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:text-slate-200"
                    >
                      <Mail className="h-4 w-4" />
                      {employee.email}
                    </a>
                  )}
                  {employee.phone && (
                    <a
                      href={`tel:${employee.phone.replace(/\s+/g, "")}`}
                      dir="ltr"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:text-slate-200"
                    >
                      <Phone className="h-4 w-4" />
                      {employee.phone}
                    </a>
                  )}
                  {employee.linkedin && (
                    <a
                      href={employee.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:text-slate-200"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
