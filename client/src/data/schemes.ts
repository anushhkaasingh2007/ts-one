import type { Scheme } from "@/types";

export const SCHEMES: Scheme[] = [
  {
    id: "pre-matric",
    key: "PRE_MATRIC",
    name: "Pre-Matric Scholarship",
    shortDescription: "Financial assistance for ST students in Classes 9 and 10 to reduce dropout rates.",
    eligibilitySummary: "ST students, Class 9–10, family income up to ₹2.5 lakh/year",
    icon: "book",
  },
  {
    id: "post-matric",
    key: "POST_MATRIC",
    name: "Post-Matric Scholarship",
    shortDescription: "Support for ST students pursuing studies beyond Class 10, including college and diploma courses.",
    eligibilitySummary: "ST students, Class 11 onwards, family income up to ₹2.5 lakh/year",
    icon: "graduation",
  },
  {
    id: "top-class",
    key: "TOP_CLASS",
    name: "Top Class Education Scheme",
    shortDescription: "Full financial support for ST students admitted to premier institutions notified by MoTA.",
    eligibilitySummary: "ST students in notified institutions, family income up to ₹6 lakh/year",
    icon: "award",
  },
  {
    id: "nfst",
    key: "NFST",
    name: "National Fellowship for ST (NFST)",
    shortDescription: "Fellowship support for ST students pursuing M.Phil and Ph.D degrees in India.",
    eligibilitySummary: "ST students, UGC-NET/JRF qualified, enrolled in M.Phil/Ph.D",
    icon: "flask",
  },
  {
    id: "nos",
    key: "NOS",
    name: "National Overseas Scholarship (NOS)",
    shortDescription: "Financial assistance for ST students to pursue Masters and Ph.D programs abroad.",
    eligibilitySummary: "ST students, admission to recognised foreign university, family income up to ₹6 lakh/year",
    icon: "plane",
  },
];
