import {
  FolderLock,
  Fingerprint,
  IdCard,
  School,
  Landmark,
  GraduationCap,
  Building2,
  FileText,
  Accessibility,
  type LucideIcon,
} from "lucide-react";
import type { VerificationSource } from "@/types";

export const VERIFICATION_SOURCES: Record<
  VerificationSource,
  { name: string; description: string; icon: LucideIcon }
> = {
  DIGILOCKER: { name: "DigiLocker", description: "Fetches signed academic & identity documents", icon: FolderLock },
  UIDAI: { name: "UIDAI", description: "Aadhaar identity verification", icon: Fingerprint },
  APAAR: { name: "APAAR ID", description: "Academic Bank of Credits student ID", icon: IdCard },
  UDISE: { name: "UDISE+", description: "School enrolment & institution records", icon: School },
  AISHE: { name: "AISHE", description: "Higher-education institution records", icon: Landmark },
  UGC_NTA: { name: "UGC / NTA", description: "Entrance exam & eligibility records", icon: GraduationCap },
  E_DISTRICT: { name: "State e-District", description: "State government resident services", icon: Building2 },
  INCOME_CERT: { name: "Income Certificate", description: "State-issued family income record", icon: FileText },
  DISABILITY_CERT: { name: "Disability Certificate", description: "UDID-linked disability record", icon: Accessibility },
};
