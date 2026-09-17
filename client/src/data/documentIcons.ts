import { Fingerprint, ScrollText, FileSpreadsheet, GraduationCap, BadgeCheck, Landmark, Accessibility, IdCard, type LucideIcon } from "lucide-react";
import type { DocumentType } from "@/types";

export const DOCUMENT_ICONS: Record<DocumentType, LucideIcon> = {
  AADHAAR: Fingerprint,
  CASTE_CERTIFICATE: ScrollText,
  INCOME_CERTIFICATE: FileSpreadsheet,
  MARKSHEET: GraduationCap,
  BONAFIDE_CERTIFICATE: BadgeCheck,
  BANK_PASSBOOK: Landmark,
  DISABILITY_CERTIFICATE: Accessibility,
  ADMIT_CARD: IdCard,
};

export const DOCUMENT_LABELS: Record<DocumentType, string> = {
  AADHAAR: "Aadhaar Card",
  CASTE_CERTIFICATE: "ST Caste Certificate",
  INCOME_CERTIFICATE: "Income Certificate",
  MARKSHEET: "Marksheet",
  BONAFIDE_CERTIFICATE: "Bonafide Certificate",
  BANK_PASSBOOK: "Bank Passbook",
  DISABILITY_CERTIFICATE: "Disability Certificate",
  ADMIT_CARD: "Admit Card",
};
