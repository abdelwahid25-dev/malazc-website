import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  DollarSign,
  Megaphone,
  Scale,
  ShoppingCart,
  Users,
} from "lucide-react";
import { employeeImages } from "./employeeImages";
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
  | "legal-administrative"
  | "procurement"
  | "sales"
  | "technology"
  | "marketing";

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
  image?: string | null;
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
      en: "Leadership and strategic direction for Logistics Services.",
      ar: "القيادة والتوجيه الاستراتيجي لقسم الخدمات اللوجستية.",
    },
    icon: Briefcase,
  },
  {
    id: "operations",
    name: { en: "Operations", ar: "العمليات" },
    description: {
      en: "Operational execution and service delivery.",
      ar: "التنفيذ التشغيلي وتقديم الخدمات.",
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
    id: "legal-administrative",
    name: { en: "Legal & Administrative Affairs", ar: "الشؤون القانونية والإدارية" },
    description: {
      en: "Legal, administrative and governance support.",
      ar: "الدعم القانوني والإداري والحوكمة.",
    },
    icon: Scale,
  },
  {
    id: "procurement",
    name: { en: "Procurement", ar: "المشتريات" },
    description: {
      en: "Sourcing, purchasing and supplier coordination.",
      ar: "التوريد والشراء والتنسيق مع الموردين.",
    },
    icon: ShoppingCart,
  },
  {
    id: "sales",
    name: { en: "Sales", ar: "المبيعات" },
    description: {
      en: "Client engagement and business development.",
      ar: "التواصل مع العملاء وتطوير الأعمال.",
    },
    icon: Megaphone,
  },
  {
    id: "technology",
    name: { en: "IT Solutions", ar: "حلول تقنية المعلومات" },
    description: {
      en: "Technology systems, digital solutions and technical support.",
      ar: "الأنظمة التقنية والحلول الرقمية والدعم الفني.",
    },
    icon: Users,
  },
  {
    id: "marketing",
    name: { en: "Marketing", ar: "التسويق" },
    description: {
      en: "Brand promotion, campaigns and market outreach.",
      ar: "الترويج للعلامة التجارية والحملات والتواصل مع السوق.",
    },
    icon: Megaphone,
  },
];

export const employees: Employee[] = [
  // Department structure transcribed from the supplied Logistics Services chart.
  {
    id: "emp-001",
    name: { en: "Hussam Dafallah", ar: "حسام دفع الله" },
    position: { en: "Executive Manager", ar: "الرئيس التنفيذي" },
    departmentId: "executive",
    level: "leadership",
    managerId: null,
    image: employeeImages.hussamDafallah,
    description: {
      en: "Leads the company's strategic direction, oversees business performance, and ensures every department works together to deliver reliable, high-quality logistics services.",
      ar: "يقود التوجه الاستراتيجي للشركة، ويشرف على أداء الأعمال، ويضمن تكامل جميع الإدارات لتقديم خدمات لوجستية موثوقة وعالية الجودة.",
    },
    email: "hussam.dafallah@malazc.com",
    phone: "+966 581117181",
  },
  {
    id: "emp-002",
    name: { en: "Yahya Shukri", ar: "يحيى شكري" },
    position: { en: "Sales Supervisor", ar: "مشرف مبيعات" },
    departmentId: "sales",
    level: "head",
    managerId: "emp-001",
    image: employeeImages.yahiaShkri,
    description: {
      en: "Develops client relationships, identifies new business opportunities, and leads sales activities to support sustainable company growth.",
      ar: "يطور علاقات العملاء، ويحدد فرص الأعمال الجديدة، ويقود أنشطة المبيعات لدعم نمو الشركة المستدام.",
    },
    phone: "+966 539995170",
    email: "yahya.shukri@malazc.com",
  },
  {
    id: "emp-003",
    name: { en: "Bashar Mohammed", ar: "بشار محمد" },
    position: { en: "Procurement Manager", ar: "مشرف مشتريات" },
    departmentId: "procurement",
    level: "head",
    managerId: "emp-001",
    image: employeeImages.basharMohammed,
    description: {
      en: "Manages sourcing, supplier relationships, purchasing processes, and cost-effective procurement to support smooth operations.",
      ar: "يدير التوريد وعلاقات الموردين وإجراءات الشراء والمشتريات الفعالة من حيث التكلفة لدعم سير العمليات بسلاسة.",
    },
    phone: "+966 551465854",
    email: "bashar.mohammed@malazc.com",
  },
  {
    id: "emp-004",
    name: { en: "Abdulhafeez Mohammed Irshad", ar: "عبدالحفيظ محمد إرشاد" },
    position: { en: "Operation Supervisor", ar: "مسؤول التشغيل" },
    departmentId: "operations",
    level: "head",
    managerId: "emp-001",
    image: employeeImages.abdulHafeez,
    description: {
      en: "Oversees daily logistics operations, coordinates service delivery, and maintains operational quality, safety, and efficiency.",
      ar: "يشرف على العمليات اللوجستية اليومية، وينسق تقديم الخدمات، ويحافظ على الجودة التشغيلية والسلامة والكفاءة.",
    },
    phone: "+966 544175455",
    email: "abdul.hafeez@malazc.com",
  },
  {
    id: "emp-005",
    name: { en: "Faris Abu Alama", ar: "فارس ابوعلامة" },
    position: { en: "Finance Supervisor", ar: "مشرف المالية" },
    departmentId: "finance",
    level: "head",
    managerId: "emp-001",
    image: employeeImages.farisAbualama,
    description: {
      en: "Leads financial planning, reporting, budgeting, and internal controls to support sound decisions and long-term financial stability.",
      ar: "يقود التخطيط المالي وإعداد التقارير والميزانيات والرقابة الداخلية لدعم القرارات السليمة والاستقرار المالي على المدى الطويل.",
    },
    phone: "+966 542410428",
    email: "faris.abualama@malazc.com",
  },
  {
    id: "emp-006",
    name: { en: "Fatima Ibrahim", ar: "فاطمة إبراهيم" },
    position: { en: "Legal & Administrative Affairs Manager", ar: "مديرة الشؤون القانونية والإدارية" },
    departmentId: "legal-administrative",
    level: "head",
    managerId: "emp-001",
    image: employeeImages.fatimaIbrahim,
    description: {
      en: "Oversees legal compliance, administrative operations, policies, and governance to ensure the company operates with clarity and accountability.",
      ar: "تشرف على الامتثال القانوني والعمليات الإدارية والسياسات والحوكمة لضمان عمل الشركة بوضوح ومسؤولية.",
    },
    phone: "+966 579779093",
    email: "fatima.ibrahim@malazc.com",
  },
  {
    id: "emp-007",
    name: { en: "Ebtisam Al-Nufaii", ar: "ابتسام النفيعي" },
    position: { en: "Call Center Supervisor", ar: "مشرفة مركز الاتصال" },
    departmentId: "sales",
    level: "member",
    managerId: "emp-002",
    image: null,
    description: {
      en: "Supervises call center operations, supports the customer service team, and helps ensure timely, professional responses to client enquiries.",
      ar: "تشرف على عمليات مركز الاتصال، وتدعم فريق خدمة العملاء، وتساعد على ضمان الاستجابة المهنية والسريعة لاستفسارات العملاء.",
    },
  },
  {
    id: "emp-008",
    name: { en: "Abdulwahid Osman", ar: "عبدالواحد عثمان" },
    position: { en: "IT Solutions Manager", ar: "مدير حلول تقنية المعلومات" },
    departmentId: "technology",
    level: "head",
    managerId: "emp-001",
    image: employeeImages.abdelwahidOsman,
    description: {
      en: "Leads the planning and delivery of technology solutions, maintains core systems, and ensures reliable technical support for the company and its clients.",
      ar: "يقود تخطيط وتنفيذ الحلول التقنية، ويحافظ على الأنظمة الأساسية، ويضمن توفير دعم فني موثوق للشركة وعملائها.",
    },
    email: "abdelwahid.osman@malazc.com"
  },
  {
    id: "emp-009",
    name: { en: "Yaser", ar: "ياسر" },
    position: { en: "Marketing Manager", ar: "مدير التسويق" },
    departmentId: "marketing",
    level: "head",
    managerId: "emp-001",
    image: null,
    description: {
      en: "Leads marketing strategy and brand promotion, and coordinates campaigns to strengthen the company's presence with clients and partners.",
      ar: "يقود استراتيجية التسويق والترويج للعلامة التجارية، وينسق الحملات لتعزيز حضور الشركة لدى العملاء والشركاء.",
    },
  },
  {
    id: "emp-010",
    name: { en: "Hussain", ar: "حسين" },
    position: { en: "Marketing Specialist", ar: "أخصائي تسويق" },
    departmentId: "marketing",
    level: "member",
    managerId: "emp-009",
    image: null,
    description: {
      en: "Supports marketing campaigns, content and outreach activities to help grow the company's brand and customer engagement.",
      ar: "يدعم الحملات التسويقية والمحتوى وأنشطة التواصل للمساهمة في نمو العلامة التجارية للشركة وتفاعل العملاء.",
    },
  },
];

/** Look up a single employee by id. */
export const getEmployee = (id: string | null): Employee | undefined =>
  id ? employees.find((e) => e.id === id) : undefined;

/** Employees belonging to a department. */
export const employeesByDepartment = (departmentId: DepartmentId): Employee[] =>
  employees.filter((e) => e.departmentId === departmentId);
