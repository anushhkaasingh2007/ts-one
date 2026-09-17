import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

const SOURCES = [
  "DIGILOCKER",
  "UIDAI",
  "APAAR",
  "UDISE",
  "AISHE",
  "UGC_NTA",
  "E_DISTRICT",
  "INCOME_CERT",
  "DISABILITY_CERT",
] as const;

router.get("/", async (req: AuthedRequest, res: Response) => {
  const logs = await prisma.verificationLog.findMany({
    where: { studentId: req.studentId },
    orderBy: { checkedAt: "desc" },
  });
  res.json(logs);
});

const runSchema = z.object({ source: z.enum(SOURCES) });

router.post("/:source/run", async (req: AuthedRequest, res: Response) => {
  const parsed = runSchema.safeParse({ source: (req as Request).params.source });
  if (!parsed.success) return res.status(400).json({ error: "Unknown verification source" });

  const roll = Math.random();
  const status = roll < 0.82 ? "VERIFIED" : roll < 0.95 ? "MANUAL_REVIEW" : "FAILED";

  const log = await prisma.verificationLog.create({
    data: {
      studentId: req.studentId!,
      source: parsed.data.source,
      status,
      remarks:
        status === "VERIFIED"
          ? "Record matched successfully"
          : status === "MANUAL_REVIEW"
          ? "Minor mismatch found — routed to district officer"
          : "Record could not be located",
    },
  });

  res.status(201).json(log);
});

export default router;
