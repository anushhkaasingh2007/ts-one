export type SchemeKey = "PRE_MATRIC" | "POST_MATRIC" | "TOP_CLASS" | "NFST" | "NOS";

export type ApplicationStage =
  | "SUBMITTED"
  | "VERIFIED"
  | "APPROVED"
  | "SANCTIONED"
  | "DISBURSED"
  | "REJECTED";

export type DocumentType =
  | "AADHAAR"
  | "CASTE_CERTIFICATE"
  | "INCOME_CERTIFICATE"
  | "MARKSHEET"
  | "BONAFIDE_CERTIFICATE"
  | "BANK_PASSBOOK"
  | "DISABILITY_CERTIFICATE"
  | "ADMIT_CARD";

export type DocumentStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type VerificationSource =
  | "DIGILOCKER"
  | "UIDAI"
  | "APAAR"
  | "UDISE"
  | "AISHE"
  | "UGC_NTA"
  | "E_DISTRICT"
  | "INCOME_CERT"
  | "DISABILITY_CERT";

export type VerificationStatus = "PENDING" | "VERIFIED" | "FAILED" | "MANUAL_REVIEW";

export type NotificationCategory = "VERIFICATION" | "APPLICATION" | "SANCTION" | "DBT" | "GENERAL";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  community: string;
  aadhaarLast4: string;
  aadhaarVerified: boolean;
  digilockerLinked: boolean;
}

export interface Scheme {
  id: string;
  key: SchemeKey;
  name: string;
  shortDescription: string;
  eligibilitySummary: string;
  icon: string;
}

export interface StatusEvent {
  id: string;
  stage: ApplicationStage;
  occurredAt: string;
  remarks?: string | null;
}

export interface Application {
  id: string;
  scheme: Scheme;
  academicYear: string;
  stage: ApplicationStage;
  amountRequested: number;
  amountSanctioned?: number | null;
  submittedAt: string;
  updatedAt: string;
  statusEvents: StatusEvent[];
}

export interface DocumentItem {
  id: string;
  type: DocumentType;
  fileName: string;
  status: DocumentStatus;
  verifiedSource?: string | null;
  uploadedAt: string;
}

export interface VerificationLog {
  id: string;
  source: VerificationSource;
  status: VerificationStatus;
  checkedAt: string;
  remarks?: string | null;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "USER" | "BOT";
  message: string;
  createdAt: string;
}

export interface AnalyticsSummary {
  applicationsSubmitted: number;
  studentsVerified: number;
  scholarshipsSanctioned: number;
  fundsDisbursed: number;
  unreachedStudentsIdentified: number;
}
