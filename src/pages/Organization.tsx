import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Users } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import {
  departments,
  employees,
  employeesByDepartment,
  loc,
  type DepartmentId,
  type Employee,
} from "../data/organization";
import { EmployeeCard } from "../components/org/EmployeeCard";
import { EmployeeModal } from "../components/org/EmployeeModal";

type Filter = DepartmentId | "all";

const connector = "bg-slate-200 dark:bg-slate-800";

export default function Organization() {
  const { language, t } = useLanguage();
  const [selected, setSelected] = useState<Employee | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const ceo = useMemo(() => employees.find((e) => e.managerId === null), []);
  const executives = useMemo(
    () =>
      employees.filter(
        (e) => e.level === "leadership" && e.managerId === ceo?.id,
      ),
    [ceo],
  );

  // Department members excluding leadership (leaders are shown in the top tier).
  const deptMembers = (id: DepartmentId) =>
    employeesByDepartment(id).filter((e) => e.level !== "leadership");

  const visibleDepartments = useMemo(
    () => departments.filter((d) => deptMembers(d.id).length > 0),
    [],
  );

  const shownDepartments = visibleDepartments.filter(
    (d) => filter === "all" || d.id === filter,
  );

  return (
    <div className="bg-white transition-colors dark:bg-slate-950">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 dark:border-slate-800">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2074&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
        />
        <div className="absolute inset-0 bg-slate-950/68" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
          <span className="mb-5 inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-extrabold uppercase text-primary backdrop-blur">
            {t("orgEyebrow")}
          </span>
          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight text-white sm:text-6xl">
            {t("orgTitle")}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-200">
            {t("orgSubtitle")}
          </p>
          <p className="mt-4 max-w-3xl text-sm font-medium text-slate-400">
            {t("orgPlaceholderNote")}
          </p>
        </div>
      </section>

      {/* Leadership tier */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-sm font-extrabold uppercase text-primary">
              {t("orgLeadershipTitle")}
            </span>
          </div>

          {ceo && (
            <div className="flex flex-col items-center">
              <div className="w-full max-w-xs">
                <EmployeeCard employee={ceo} onSelect={setSelected} emphasized />
              </div>

              {executives.length > 0 && (
                <>
                  <div className={`h-8 w-px ${connector}`} />
                  <div className="relative flex w-full flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8">
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-[20%] top-0 hidden h-px sm:block ${connector}`}
                    />
                    {executives.map((exec) => (
                      <div
                        key={exec.id}
                        className="relative flex flex-col items-center"
                      >
                        <div
                          aria-hidden="true"
                          className={`hidden h-6 w-px sm:block ${connector}`}
                        />
                        <div className="w-full max-w-xs sm:w-72">
                          <EmployeeCard
                            employee={exec}
                            onSelect={setSelected}
                            emphasized
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Departments */}
      <section className="surface-grid border-y border-slate-200 bg-slate-50 py-20 transition-colors dark:border-slate-800 dark:bg-slate-900/60 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10">
            <span className="mb-4 block text-sm font-extrabold uppercase text-primary">
              {t("orgDepartmentsTitle")}
            </span>
            <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white sm:text-5xl">
              {t("orgTitle")}
            </h2>
          </div>

          {/* Filter tabs */}
          <div
            role="tablist"
            aria-label={t("orgDepartmentsTitle")}
            className="mb-10 flex flex-wrap gap-2"
          >
            <FilterPill
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              {t("orgFilterAll")}
            </FilterPill>
            {visibleDepartments.map((d) => (
              <FilterPill
                key={d.id}
                active={filter === d.id}
                onClick={() => setFilter(d.id)}
              >
                {loc(d.name, language)}
              </FilterPill>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {shownDepartments.map((dept) => {
              const members = deptMembers(dept.id);
              const head = members.find((m) => m.level === "head");
              const rest = members.filter((m) => m.level !== "head");
              const Icon = dept.icon;

              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4 }}
                  className="elevated-surface rounded-lg border border-slate-200 bg-white p-6 transition-colors dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                        {loc(dept.name, language)}
                      </h3>
                      <p className="mt-1 text-sm font-medium leading-6 text-slate-600 dark:text-slate-300">
                        {loc(dept.description, language)}
                      </p>
                    </div>
                  </div>

                  {head && (
                    <div className="mb-4">
                      <div className="mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {t("orgDepartmentHead")}
                      </div>
                      <EmployeeCard employee={head} onSelect={setSelected} />
                      {rest.length > 0 && (
                        <div className={`ms-7 h-5 w-px ${connector}`} />
                      )}
                    </div>
                  )}

                  {rest.length > 0 && (
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        <Users className="h-3.5 w-3.5" />
                        {t("orgTeamMembers")}
                      </div>
                      <div className="grid gap-3">
                        {rest.map((member) => (
                          <EmployeeCard
                            key={member.id}
                            employee={member}
                            onSelect={setSelected}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <EmployeeModal employee={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

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
