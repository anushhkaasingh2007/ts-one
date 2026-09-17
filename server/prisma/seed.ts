import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const SCHEMES = [
  {
    key: "PRE_MATRIC" as const,
    name: "Pre-Matric Scholarship",
    shortDescription: "Financial assistance for ST students in Classes 9 and 10 to reduce dropout rates.",
    eligibilitySummary: "ST students, Class 9–10, family income up to ₹2.5 lakh/year",
    icon: "book",
  },
  {
    key: "POST_MATRIC" as const,
    name: "Post-Matric Scholarship",
    shortDescription: "Support for ST students pursuing studies beyond Class 10, including college and diploma courses.",
    eligibilitySummary: "ST students, Class 11 onwards, family income up to ₹2.5 lakh/year",
    icon: "graduation",
  },
  {
    key: "TOP_CLASS" as const,
    name: "Top Class Education Scheme",
    shortDescription: "Full financial support for ST students admitted to premier institutions notified by MoTA.",
    eligibilitySummary: "ST students in notified institutions, family income up to ₹6 lakh/year",
    icon: "award",
  },
  {
    key: "NFST" as const,
    name: "National Fellowship for ST (NFST)",
    shortDescription: "Fellowship support for ST students pursuing M.Phil and Ph.D degrees in India.",
    eligibilitySummary: "ST students, UGC-NET/JRF qualified, enrolled in M.Phil/Ph.D",
    icon: "flask",
  },
  {
    key: "NOS" as const,
    name: "National Overseas Scholarship (NOS)",
    shortDescription: "Financial assistance for ST students to pursue Masters and Ph.D programs abroad.",
    eligibilitySummary: "ST students, admission to recognised foreign university, family income up to ₹6 lakh/year",
    icon: "plane",
  },
];

async function main() {
  console.log("Seeding schemes...");
  const schemeRecords: Record<string, { id: string }> = {};
  for (const scheme of SCHEMES) {
    const record = await prisma.scheme.upsert({
      where: { key: scheme.key },
      update: scheme,
      create: scheme,
    });
    schemeRecords[scheme.key] = record;
  }

  console.log("Seeding demo student...");
  const passwordHash = await bcrypt.hash("TSOne@2025", 10);
  const email = "demo.student@tsone.gov.in";

  await prisma.student.deleteMany({ where: { email } });

  const student = await prisma.student.create({
    data: {
      name: "Sunita Oraon",
      email,
      passwordHash,
      phone: "9876543210",
      state: "Jharkhand",
      district: "Gumla",
      community: "Oraon (Scheduled Tribe)",
      aadhaarLast4: "8421",
      aadhaarVerified: true,
      digilockerLinked: true,
    },
  });

  console.log("Seeding applications...");
  const postMatric = await prisma.application.create({
    data: {
      studentId: student.id,
      schemeId: schemeRecords.POST_MATRIC.id,
      academicYear: "2025-26",
      stage: "SANCTIONED",
      amountRequested: 48000,
      amountSanctioned: 48000,
      submittedAt: new Date("2025-07-12"),
      statusEvents: {
        create: [
          { stage: "SUBMITTED", occurredAt: new Date("2025-07-12"), remarks: "Application submitted by student" },
          { stage: "VERIFIED", occurredAt: new Date("2025-07-24"), remarks: "Income certificate verified via State e-District" },
          { stage: "APPROVED", occurredAt: new Date("2025-08-02"), remarks: "Approved by District Welfare Officer" },
          { stage: "SANCTIONED", occurredAt: new Date("2025-08-14"), remarks: "Scholarship amount sanctioned" },
        ],
      },
    },
  });

  await prisma.application.create({
    data: {
      studentId: student.id,
      schemeId: schemeRecords.TOP_CLASS.id,
      academicYear: "2025-26",
      stage: "VERIFIED",
      amountRequested: 150000,
      submittedAt: new Date("2025-08-20"),
      statusEvents: {
        create: [
          { stage: "SUBMITTED", occurredAt: new Date("2025-08-20"), remarks: "Application submitted by student" },
          { stage: "VERIFIED", occurredAt: new Date("2025-09-05"), remarks: "Institute bonafide verified via AISHE" },
        ],
      },
    },
  });

  console.log("Seeding documents...");
  await prisma.document.createMany({
    data: [
      { studentId: student.id, type: "AADHAAR", fileName: "aadhaar_card.pdf", status: "VERIFIED", verifiedSource: "UIDAI", uploadedAt: new Date("2025-07-10") },
      { studentId: student.id, type: "CASTE_CERTIFICATE", fileName: "st_caste_certificate.pdf", status: "VERIFIED", verifiedSource: "State e-District", uploadedAt: new Date("2025-07-10") },
      { studentId: student.id, type: "INCOME_CERTIFICATE", fileName: "income_certificate.pdf", status: "VERIFIED", verifiedSource: "State e-District", uploadedAt: new Date("2025-07-11") },
      { studentId: student.id, type: "MARKSHEET", fileName: "class_12_marksheet.pdf", status: "VERIFIED", verifiedSource: "UDISE+ / AISHE", uploadedAt: new Date("2025-07-11") },
      { studentId: student.id, type: "BANK_PASSBOOK", fileName: "bank_passbook.pdf", status: "VERIFIED", verifiedSource: "NPCI / DBT Mapper", uploadedAt: new Date("2025-07-12") },
      { studentId: student.id, type: "BONAFIDE_CERTIFICATE", fileName: "college_bonafide.pdf", status: "PENDING", uploadedAt: new Date("2025-09-08") },
    ],
  });

  console.log("Seeding verification logs...");
  await prisma.verificationLog.createMany({
    data: [
      { studentId: student.id, source: "DIGILOCKER", status: "VERIFIED", checkedAt: new Date("2025-07-10"), remarks: "Documents fetched successfully" },
      { studentId: student.id, source: "UIDAI", status: "VERIFIED", checkedAt: new Date("2025-07-10"), remarks: "Aadhaar identity confirmed" },
      { studentId: student.id, source: "APAAR", status: "VERIFIED", checkedAt: new Date("2025-07-11"), remarks: "APAAR ID linked" },
      { studentId: student.id, source: "UDISE", status: "VERIFIED", checkedAt: new Date("2025-07-11"), remarks: "School enrolment confirmed" },
      { studentId: student.id, source: "AISHE", status: "PENDING", checkedAt: new Date("2025-09-08"), remarks: "Awaiting institute confirmation" },
      { studentId: student.id, source: "UGC_NTA", status: "VERIFIED", checkedAt: new Date("2025-07-15"), remarks: "Entrance record matched" },
      { studentId: student.id, source: "E_DISTRICT", status: "MANUAL_REVIEW", checkedAt: new Date("2025-09-10"), remarks: "Name mismatch — routed to district officer" },
      { studentId: student.id, source: "INCOME_CERT", status: "VERIFIED", checkedAt: new Date("2025-07-24"), remarks: "Income certificate verified" },
    ],
  });

  console.log("Seeding notifications...");
  await prisma.notification.createMany({
    data: [
      { studentId: student.id, title: "Income certificate verified", message: "Your income certificate was successfully verified via State e-District services.", category: "VERIFICATION", read: false, createdAt: new Date("2025-09-14T09:20:00Z") },
      { studentId: student.id, title: "Application moved to institute verification", message: "Your Top Class Education Scheme application has been forwarded to your institute for verification.", category: "APPLICATION", read: false, createdAt: new Date("2025-09-05T14:05:00Z") },
      { studentId: student.id, title: "Scholarship sanctioned", message: "Congratulations! Your Post-Matric Scholarship of ₹48,000 has been sanctioned.", category: "SANCTION", read: true, createdAt: new Date("2025-08-14T11:45:00Z") },
      { studentId: student.id, title: "DBT credited", message: "₹48,000 has been credited to your Aadhaar-linked bank account via Direct Benefit Transfer.", category: "DBT", read: true, createdAt: new Date("2025-08-18T16:30:00Z") },
      { studentId: student.id, title: "Document reminder", message: "Please upload your latest bonafide certificate to avoid delay in Top Class Education Scheme processing.", category: "GENERAL", read: true, createdAt: new Date("2025-08-02T10:00:00Z") },
    ],
  });

  console.log("Seeding chat messages...");
  await prisma.chatMessage.create({
    data: {
      studentId: student.id,
      sender: "BOT",
      message: "Namaste! I'm JAGO, your scholarship assistant. Ask me about eligibility, application status, missing documents or DBT payments.",
    },
  });

  console.log("Seed complete.");
  console.log(`Demo login -> email: ${email} / password: TSOne@2025`);
  console.log(`Application seeded: ${postMatric.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
