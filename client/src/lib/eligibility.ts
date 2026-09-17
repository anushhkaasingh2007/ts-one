import type { SchemeKey } from "@/types";

export interface EligibilityInput {
  category: "ST" | "OTHER";
  classLevel: "9-10" | "11-12" | "UG-PG" | "MPHIL-PHD" | "ABROAD";
  annualIncome: number;
  hasQualifyingExam: boolean;
  admittedToPremierInstitute: boolean;
}

export interface EligibilityResult {
  key: SchemeKey;
  eligible: boolean;
  reason: string;
}

export function checkEligibility(input: EligibilityInput): EligibilityResult[] {
  const results: EligibilityResult[] = [];

  if (input.category !== "ST") {
    return (["PRE_MATRIC", "POST_MATRIC", "TOP_CLASS", "NFST", "NOS"] as SchemeKey[]).map((key) => ({
      key,
      eligible: false,
      reason: "All five schemes are exclusively for Scheduled Tribe (ST) students.",
    }));
  }

  results.push({
    key: "PRE_MATRIC",
    eligible: input.classLevel === "9-10" && input.annualIncome <= 250000,
    reason:
      input.classLevel === "9-10"
        ? input.annualIncome <= 250000
          ? "Meets Class 9-10 and income criteria."
          : "Family income exceeds the ₹2.5 lakh limit."
        : "Applicable only for Class 9 and 10 students.",
  });

  results.push({
    key: "POST_MATRIC",
    eligible: (input.classLevel === "11-12" || input.classLevel === "UG-PG") && input.annualIncome <= 250000,
    reason:
      input.classLevel === "11-12" || input.classLevel === "UG-PG"
        ? input.annualIncome <= 250000
          ? "Meets Class 11 onwards and income criteria."
          : "Family income exceeds the ₹2.5 lakh limit."
        : "Applicable from Class 11 onwards.",
  });

  results.push({
    key: "TOP_CLASS",
    eligible: input.admittedToPremierInstitute && input.annualIncome <= 600000,
    reason: input.admittedToPremierInstitute
      ? input.annualIncome <= 600000
        ? "Admission to a notified premier institute confirmed."
        : "Family income exceeds the ₹6 lakh limit."
      : "Requires admission to a MoTA-notified premier institution.",
  });

  results.push({
    key: "NFST",
    eligible: input.classLevel === "MPHIL-PHD" && input.hasQualifyingExam,
    reason:
      input.classLevel === "MPHIL-PHD"
        ? input.hasQualifyingExam
          ? "M.Phil/Ph.D enrolment with qualifying exam confirmed."
          : "UGC-NET/JRF or equivalent qualification is required."
        : "Applicable only for M.Phil/Ph.D scholars.",
  });

  results.push({
    key: "NOS",
    eligible: input.classLevel === "ABROAD" && input.annualIncome <= 600000,
    reason:
      input.classLevel === "ABROAD"
        ? input.annualIncome <= 600000
          ? "Foreign admission and income criteria met."
          : "Family income exceeds the ₹6 lakh limit."
        : "Applicable only for admission to a foreign university.",
  });

  return results;
}
