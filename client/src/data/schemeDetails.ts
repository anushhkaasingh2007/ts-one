import type { SchemeKey } from "@/types";

export interface SchemeDetail {
  benefits: string[];
  documentsRequired: string[];
  process: string[];
  faqs: { q: string; a: string }[];
  amount: string;
}

export const SCHEME_DETAILS: Record<SchemeKey, SchemeDetail> = {
  PRE_MATRIC: {
    amount: "₹3,500 – ₹10,000 per year (hostellers/day-scholars)",
    benefits: [
      "Admission fee and tuition fee reimbursement",
      "Maintenance allowance for hostellers and day scholars",
      "Ad-hoc grant for study materials",
    ],
    documentsRequired: ["Aadhaar Card", "ST Caste Certificate", "Income Certificate", "Previous year marksheet", "Bank Passbook"],
    process: [
      "Register on TS-One with Aadhaar-based e-KYC",
      "Fill the Pre-Matric application form",
      "Upload required documents for auto-verification",
      "Institute verifies enrolment via UDISE+",
      "District Welfare Officer approves and sanctions",
      "Amount disbursed via DBT",
    ],
    faqs: [
      { q: "Who is eligible?", a: "ST students studying in Class 9 or 10 with family income up to ₹2.5 lakh per annum." },
      { q: "Is a bank account mandatory?", a: "Yes, an Aadhaar-seeded bank account is required for DBT disbursal." },
    ],
  },
  POST_MATRIC: {
    amount: "Up to ₹1,20,000 per year depending on course and institution type",
    benefits: [
      "Full tuition fee reimbursement (non-refundable)",
      "Maintenance allowance for hostellers and day scholars",
      "Book grant and thesis/study tour support for eligible courses",
    ],
    documentsRequired: ["Aadhaar Card", "ST Caste Certificate", "Income Certificate", "Class 12/previous marksheet", "Bonafide Certificate", "Bank Passbook"],
    process: [
      "Register on TS-One with Aadhaar-based e-KYC",
      "Fill the Post-Matric application with course & institution details",
      "Upload required documents for auto-verification",
      "Institute verifies enrolment via AISHE",
      "State Nodal Officer approves and sanctions",
      "Amount disbursed via DBT in instalments",
    ],
    faqs: [
      { q: "Who is eligible?", a: "ST students studying Class 11 onwards with family income up to ₹2.5 lakh per annum." },
      { q: "Can I apply for more than one year?", a: "Yes, renewal applications are filed every academic year through the same dashboard." },
    ],
  },
  TOP_CLASS: {
    amount: "Full tuition fee + living allowance up to ₹2,50,000 per year",
    benefits: [
      "100% tuition fee reimbursement at notified premier institutions",
      "Maintenance allowance and book grant",
      "No income ceiling restriction below ₹6 lakh/year cut-off",
    ],
    documentsRequired: ["Aadhaar Card", "ST Caste Certificate", "Income Certificate", "Admission Letter", "Bank Passbook"],
    process: [
      "Confirm admission to a MoTA-notified premier institution",
      "Apply on TS-One with admission proof",
      "Institute verification via AISHE",
      "Ministry-level approval and sanction",
      "Amount disbursed via DBT",
    ],
    faqs: [
      { q: "Which institutions are covered?", a: "IITs, IIMs, NLUs, AIIMS and other institutions on the MoTA notified list." },
      { q: "Is there a merit cutoff?", a: "Admission to the notified institution itself serves as the merit qualification." },
    ],
  },
  NFST: {
    amount: "₹31,000 – ₹35,000 per month fellowship + contingency grant",
    benefits: [
      "Monthly fellowship for M.Phil/Ph.D scholars",
      "Annual contingency grant for research expenses",
      "HRA as per UGC norms",
    ],
    documentsRequired: ["Aadhaar Card", "ST Caste Certificate", "UGC-NET/JRF Scorecard", "University Enrolment Proof", "Bank Passbook"],
    process: [
      "Qualify UGC-NET/JRF or equivalent",
      "Apply on TS-One with enrolment and research proposal details",
      "University verification via UGC-NTA",
      "NFST Committee review and sanction",
      "Fellowship disbursed via DBT quarterly",
    ],
    faqs: [
      { q: "Is NET mandatory?", a: "Yes, UGC-NET/JRF or an equivalent national qualifying exam is required." },
      { q: "What is the fellowship duration?", a: "Up to 5 years, subject to satisfactory annual progress review." },
    ],
  },
  NOS: {
    amount: "Full tuition, living and travel costs up to prescribed ceilings",
    benefits: [
      "Return air passage and living allowance abroad",
      "Full tuition fee at the foreign university",
      "Contingency and equipment allowance",
    ],
    documentsRequired: ["Passport", "Aadhaar Card", "ST Caste Certificate", "Income Certificate", "Foreign University Admission Letter", "Bank Passbook"],
    process: [
      "Secure admission to a recognised foreign university for Masters/Ph.D",
      "Apply on TS-One within the annual notification window",
      "Document and eligibility verification",
      "Selection Committee interview and final sanction",
      "Funds released directly to the student/university",
    ],
    faqs: [
      { q: "How many scholarships are awarded annually?", a: "A fixed number of slots are notified each year across specified study areas." },
      { q: "Is a family income limit applicable?", a: "Yes, family income should not exceed ₹6 lakh per annum." },
    ],
  },
};
