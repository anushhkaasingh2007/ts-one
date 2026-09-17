import { GraduationCap, BookOpenText, Award, FlaskConical, Plane, type LucideIcon } from "lucide-react";
import type { SchemeKey } from "@/types";

export const SCHEME_ICONS: Record<SchemeKey, LucideIcon> = {
  PRE_MATRIC: BookOpenText,
  POST_MATRIC: GraduationCap,
  TOP_CLASS: Award,
  NFST: FlaskConical,
  NOS: Plane,
};

export const SCHEME_COLORS: Record<SchemeKey, string> = {
  PRE_MATRIC: "navy",
  POST_MATRIC: "green",
  TOP_CLASS: "saffron",
  NFST: "navy",
  NOS: "green",
};
