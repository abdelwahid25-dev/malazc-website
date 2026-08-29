import React from "react";
import { UserRound } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { loc, type Employee } from "../../data/organization";

interface EmployeeCardProps {
  employee: Employee;
  onSelect: (employee: Employee) => void;
  /** Renders a wider card suited to top leadership rows. */
  emphasized?: boolean;
}

const ringByLevel: Record<Employee["level"], string> = {
  leadership: "ring-primary/40 dark:ring-primary/40",
  head: "ring-secondary/30 dark:ring-primary/25",
  member: "ring-slate-200 dark:ring-slate-700",
};

const accentByLevel: Record<Employee["level"], string> = {
  leadership: "text-primary",
  head: "text-secondary dark:text-primary",
  member: "text-slate-500 dark:text-slate-400",
};

/** A single person in the organizational chart. Click opens the profile. */
export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onSelect,
  emphasized = false,
}) => {
  const { language, t } = useLanguage();
  const name = loc(employee.name, language);
  const position = loc(employee.position, language);

  return (
    <button
      type="button"
      onClick={() => onSelect(employee)}
      aria-label={`${name} — ${position}. ${t("orgViewProfile")}`}
      className={`elevated-surface group flex w-full items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 text-start transition-all hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary/40 ${
        emphasized ? "sm:w-72" : ""
      }`}
    >
      <EmployeeAvatar employee={employee} name={name} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-extrabold text-slate-950 dark:text-white">
          {name}
        </span>
        <span className={`block truncate text-sm font-bold ${accentByLevel[employee.level]}`}>
          {position}
        </span>
      </span>
    </button>
  );
};

export const EmployeeAvatar: React.FC<{
  employee: Employee;
  name: string;
  large?: boolean;
}> = ({ employee, name, large = false }) => {
  const size = large ? "h-20 w-20" : "h-14 w-14";
  const [imageFailed, setImageFailed] = React.useState(false);

  if (!employee.image || imageFailed) {
    return (
      <span
        aria-label={name}
        className={`flex shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-2 ${size} ${ringByLevel[employee.level]}`}
      >
        <UserRound className={large ? "h-8 w-8" : "h-6 w-6"} />
      </span>
    );
  }

  return (
    <img
      src={employee.image}
      alt={name}
      loading="lazy"
      onError={() => setImageFailed(true)}
      className={`shrink-0 rounded-full object-cover ring-2 ${size} ${ringByLevel[employee.level]}`}
    />
  );
};
