import { Router, type Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);

router.get("/", async (req: AuthedRequest, res: Response) => {
  const documents = await prisma.document.findMany({
    where: { studentId: req.studentId },
    orderBy: { uploadedAt: "desc" },
  });

  res.json(documents);
});

const DOCUMENT_SOURCE: Record<string, string> = {
  AADHAAR: "UIDAI",
  CASTE_CERTIFICATE: "State e-District",
  INCOME_CERTIFICATE: "State e-District",
  MARKSHEET: "UDISE+ / AISHE",
  BONAFIDE_CERTIFICATE: "Institution (AISHE)",
  BANK_PASSBOOK: "NPCI / DBT Mapper",
  DISABILITY_CERTIFICATE: "UDID Portal",
  ADMIT_CARD: "UGC-NTA",
};

const createSchema = z.object({
  type: z.enum([
    "AADHAAR",
    "CASTE_CERTIFICATE",
    "INCOME_CERTIFICATE",
    "MARKSHEET",
    "BONAFIDE_CERTIFICATE",
    "BANK_PASSBOOK",
    "DISABILITY_CERTIFICATE",
    "ADMIT_CARD",
  ]),
  fileName: z.string().min(1),
});

router.post("/", async (req: AuthedRequest, res: Response) => {
  const parsed = createSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "type and fileName are required",
    });
  }

  const document = await prisma.document.create({
    data: {
      studentId: req.studentId!,
      ...parsed.data,
      status: "PENDING",
    },
  });

  res.status(201).json(document);
});

router.post("/:id/verify", async (req: AuthedRequest, res: Response) => {
  const documentId = String(req.params.id);

  const document = await prisma.document.findFirst({
    where: {
      id: documentId,
      studentId: req.studentId,
    },
  });

  if (!document) {
    return res.status(404).json({ error: "Document not found" });
  }

  const verified = document.status !== "REJECTED";

  const updated = await prisma.document.update({
    where: { id: document.id },
    data: {
      status: verified ? "VERIFIED" : "REJECTED",
      verifiedSource: verified
        ? DOCUMENT_SOURCE[document.type] ?? "Government Database"
        : null,
    },
  });

  if (verified) {
    await prisma.notification.create({
      data: {
        studentId: req.studentId!,
        title: `${document.fileName} verified`,
        message: `Your ${document.type
          .replaceAll("_", " ")
          .toLowerCase()} was successfully verified via ${
          DOCUMENT_SOURCE[document.type] ?? "a government database"
        }.`,
        category: "VERIFICATION",
      },
    });
  }

  res.json(updated);
});

export default router;