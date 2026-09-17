import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req: AuthedRequest, res) => {
  const applications = await prisma.application.findMany({
    where: { studentId: req.studentId },
    include: { scheme: true, statusEvents: { orderBy: { occurredAt: "asc" } } },
    orderBy: { submittedAt: "desc" },
  });
  res.json(applications);
});

const createSchema = z.object({
  schemeKey: z.enum(["PRE_MATRIC", "POST_MATRIC", "TOP_CLASS", "NFST", "NOS"]),
  academicYear: z.string().min(4),
  amountRequested: z.number().int().positive(),
});

router.post("/", async (req: AuthedRequest, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "schemeKey, academicYear and amountRequested are required" });
  }
  const { schemeKey, academicYear, amountRequested } = parsed.data;

  const scheme = await prisma.scheme.findUnique({ where: { key: schemeKey } });
  if (!scheme) return res.status(404).json({ error: "Scheme not found" });

  const existing = await prisma.application.findFirst({
    where: { studentId: req.studentId, schemeId: scheme.id, academicYear },
  });
  if (existing) {
    return res.status(409).json({ error: "An application for this scheme and academic year already exists" });
  }

  const application = await prisma.application.create({
    data: {
      studentId: req.studentId!,
      schemeId: scheme.id,
      academicYear,
      amountRequested,
      stage: "SUBMITTED",
      statusEvents: { create: { stage: "SUBMITTED", remarks: "Application submitted by student" } },
    },
    include: { scheme: true, statusEvents: true },
  });

  await prisma.notification.create({
    data: {
      studentId: req.studentId!,
      title: `${scheme.name} application submitted`,
      message: `Your application for academic year ${academicYear} has been received and is pending verification.`,
      category: "APPLICATION",
    },
  });

  res.status(201).json(application);
});

export default router;
