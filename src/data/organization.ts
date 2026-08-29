import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Cpu,
  DollarSign,
  Megaphone,
  Truck,
  Users,
} from "lucide-react";
import type { Language } from "./translations";

/**
 * ============================================================================
 * PLACEHOLDER DATA — Company Organizational Structure
 * ============================================================================
 * All employees, names and photos below are PLACEHOLDERS.
 * Replace `name`, `position`, `description`, `image`, `email`, `phone`
 * with the company's real data. Reporting relationships are driven by
 * `managerId` (an employee reports to the employee whose `id` matches).
 * Departments are configurable in `departments` below.
 *
 * To add an employee: append an object to `employees`.
 * To move an employee: change their `managerId` and/or `departmentId`.
 * To add a department: append to `departments` (id, bilingual name, icon).
 * ============================================================================
 */

/** A string that can be shown in both English and Arabic. */
export interface Localized {
  en: string;
  ar: string;
}

export type DepartmentId =
  | "executive"
  | "operations"
  | "finance"
  | "hr"
  | "marketing"
  | "technology"
  | "logistics";

export interface Department {
  id: DepartmentId;
  name: Localized;
  description: Localized;
  icon: LucideIcon;
}

/** Visual rank — controls subtle emphasis in the chart, not the data hierarchy. */
export type OrgLevel = "leadership" | "head" | "member";

export interface Employee {
  id: string;
  name: Localized;
  position: Localized;
  departmentId: DepartmentId;
  level: OrgLevel;
  /** id of the employee this person reports to, or null for the top of the chart. */
  managerId: string | null;
  image: string;
  description: Localized;
  email?: string;
  phone?: string;
  linkedin?: string;
}

/** Helper: pick the correct language string from a Localized value. */
export const loc = (value: Localized, language: Language): string =>
  value[language] || value.en;

/** Portrait placeholders (Unsplash). Replace with real employee photos. */
const portrait = (slug: string) =>
  `https://images.unsplash.com/${slug}?q=80&w=400&h=400&auto=format&fit=crop&crop=faces`;

export const departments: Department[] = [
  {
    id: "executive",
    name: { en: "Executive Management", ar: "الإدارة التنفيذية" },
    description: {
      en: "Company leadership setting strategy and direction.",
      ar: "قيادة الشركة المسؤولة عن الاستراتيجية والتوجه العام.",
    },
    icon: Briefcase,
  },
  {
    id: "operations",
    name: { en: "Operations", ar: "العمليات" },
    description: {
      en: "Day-to-day execution and service delivery.",
      ar: "التنفيذ اليومي وتقديم الخدمات.",
    },
    icon: Users,
  },
  {
    id: "finance",
    name: { en: "Finance", ar: "المالية" },
    description: {
      en: "Financial planning, accounting and controls.",
      ar: "التخطيط المالي والمحاسبة والرقابة.",
    },
    icon: DollarSign,
  },
  {
    id: "hr",
    name: { en: "Human Resources", ar: "الموارد البشرية" },
    description: {
      en: "People, talent and organizational development.",
      ar: "الموظفون والمواهب والتطوير المؤسسي.",
    },
    icon: Users,
  },
  {
    id: "marketing",
    name: { en: "Sales & Marketing", ar: "المبيعات والتسويق" },
    description: {
      en: "Brand, growth and client relationships.",
      ar: "العلامة التجارية والنمو وعلاقات العملاء.",
    },
    icon: Megaphone,
  },
  {
    id: "technology",
    name: { en: "Technology", ar: "التقنية" },
    description: {
      en: "Digital platforms, security and innovation.",
      ar: "المنصات الرقمية والأمن والابتكار.",
    },
    icon: Cpu,
  },
  {
    id: "logistics",
    name: { en: "Logistics", ar: "الخدمات اللوجستية" },
    description: {
      en: "Fleet, warehousing and distribution.",
      ar: "الأسطول والمستودعات والتوزيع.",
    },
    icon: Truck,
  },
];

const placeholderBio: Localized = {
  en: "Placeholder professional summary. Replace this text with a short biography describing responsibilities, experience and focus areas.",
  ar: "نبذة مهنية مؤقتة. استبدل هذا النص بسيرة مختصرة توضح المسؤوليات والخبرات ومجالات التركيز.",
};

export const employees: Employee[] = [
  // ---- Leadership ----------------------------------------------------------
  {
    id: "emp-001",
    name: { en: "Hussam Dafallah Fadl Al-Mawla mohammed Ali", ar: "حسام دفع الله فضل المولى محمد علي " },
    position: { en: "Chief Executive Officer", ar: "الرئيس التنفيذي" },
    departmentId: "executive",
    level: "leadership",
    managerId: null,
    image: portrait("photo-1560250097-0b93528c311a"),
    description: placeholderBio,
    email: "ceo@example.com",
    phone: "+966 5X XXX XXXX",
  },
  // ---- Executive management (report to CEO) --------------------------------
  {
    id: "emp-002",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Chief Operating Officer", ar: "رئيس العمليات" },
    departmentId: "operations",
    level: "leadership",
    managerId: "emp-001",
    image: portrait("photo-1519085360753-af0119f7cbe7"),
    description: placeholderBio,
    email: "coo@example.com",
  },
  {
    id: "emp-003",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Chief Financial Officer", ar: "المدير المالي" },
    departmentId: "finance",
    level: "leadership",
    managerId: "emp-001",
    image: portrait("photo-1573496359142-b8d87734a5a2"),
    description: placeholderBio,
    email: "cfo@example.com",
  },
  // ---- Department heads -----------------------------------------------------
  {
    id: "emp-004",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Human Resources Manager", ar: "مدير الموارد البشرية" },
    departmentId: "hr",
    level: "head",
    managerId: "emp-002",
    image: portrait("photo-1580489944761-15a19d654956"),
    description: placeholderBio,
    email: "hr@example.com",
  },
  {
    id: "emp-005",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Marketing Manager", ar: "مدير التسويق" },
    departmentId: "marketing",
    level: "head",
    managerId: "emp-002",
    image: portrait("photo-1494790108377-be9c29b29330"),
    description: placeholderBio,
    email: "marketing@example.com",
  },
  {
    id: "emp-006",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Technology Manager", ar: "مدير التقنية" },
    departmentId: "technology",
    level: "head",
    managerId: "emp-002",
    image: portrait("photo-1500648767791-00dcc994a43e"),
    description: placeholderBio,
    email: "tech@example.com",
  },
  {
    id: "emp-007",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Logistics Manager", ar: "مدير الخدمات اللوجستية" },
    departmentId: "logistics",
    level: "head",
    managerId: "emp-002",
    image: portrait("photo-1506794778202-cad84cf45f1d"),
    description: placeholderBio,
    email: "logistics@example.com",
  },
  // ---- Team members ---------------------------------------------------------
  {
    id: "emp-008",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "HR Specialist", ar: "أخصائي موارد بشرية" },
    departmentId: "hr",
    level: "member",
    managerId: "emp-004",
    image: portrait("photo-1544005313-94ddf0286df2"),
    description: placeholderBio,
  },
  {
    id: "emp-009",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Marketing Specialist", ar: "أخصائي تسويق" },
    departmentId: "marketing",
    level: "member",
    managerId: "emp-005",
    image: portrait("photo-1438761681033-6461ffad8d80"),
    description: placeholderBio,
  },
  {
    id: "emp-010",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Software Engineer", ar: "مهندس برمجيات" },
    departmentId: "technology",
    level: "member",
    managerId: "emp-006",
    image: portrait("photo-1633332755192-727a05c4013d"),
    description: placeholderBio,
  },
  {
    id: "emp-011",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Operations Coordinator", ar: "منسق عمليات" },
    departmentId: "logistics",
    level: "member",
    managerId: "emp-007",
    image: portrait("photo-1607990281513-2c110a25bd8c"),
    description: placeholderBio,
  },
  {
    id: "emp-012",
    name: { en: "Full Name", ar: "الاسم الكامل" },
    position: { en: "Accountant", ar: "محاسب" },
    departmentId: "finance",
    level: "member",
    managerId: "emp-003",
    image: portrait("photo-1472099645785-5658abf4ff4e"),
    description: placeholderBio,
  },
];

/** Look up a single employee by id. */
export const getEmployee = (id: string | null): Employee | undefined =>
  id ? employees.find((e) => e.id === id) : undefined;

/** Employees belonging to a department. */
export const employeesByDepartment = (departmentId: DepartmentId): Employee[] =>
  employees.filter((e) => e.departmentId === departmentId);
