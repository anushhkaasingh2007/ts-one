import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/messages", async (req: AuthedRequest, res) => {
  const messages = await prisma.chatMessage.findMany({
    where: { studentId: req.studentId },
    orderBy: { createdAt: "asc" },
  });
  res.json(messages);
});

function generateReply(message: string, context: { pendingDocs: number; latestStage: string | null }) {
  const text = message.toLowerCase();

  if (/status|track|application/.test(text)) {
    return context.latestStage
      ? `Your most recent application is currently at the "${context.latestStage}" stage. You can see the full timeline on the Track Status page.`
      : "You don't have any submitted applications yet. Head to the Schemes page to apply for a scholarship.";
  }
  if (/document|upload|missing|pending/.test(text)) {
    return context.pendingDocs > 0
      ? `You have ${context.pendingDocs} document(s) awaiting verification in your Document Wallet. I recommend checking those to avoid delays.`
      : "All your documents are verified. No pending action from your side.";
  }
  if (/dbt|payment|money|disburs|bank/.test(text)) {
    return "DBT transfers are processed within 5–7 working days after a scholarship is sanctioned, directly to your Aadhaar-seeded bank account.";
  }
  if (/eligib/.test(text)) {
    return "You can check your eligibility for all five schemes instantly using the Eligibility Checker — just enter your class, category and family income.";
  }
  if (/hello|hi|namaste|hey/.test(text)) {
    return "Namaste! I'm JAGO, your scholarship assistant. Ask me about eligibility, application status, missing documents or DBT payments.";
  }
  return "I can help with eligibility guidance, application status, missing documents and DBT updates. Could you rephrase your question, or choose one of these topics?";
}

const postSchema = z.object({ message: z.string().min(1).max(500) });

router.post("/messages", async (req: AuthedRequest, res) => {
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "message is required" });

  const userMessage = await prisma.chatMessage.create({
    data: { studentId: req.studentId!, sender: "USER", message: parsed.data.message },
  });

  const [pendingDocs, latestApplication] = await Promise.all([
    prisma.document.count({ where: { studentId: req.studentId, status: "PENDING" } }),
    prisma.application.findFirst({
      where: { studentId: req.studentId },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const replyText = generateReply(parsed.data.message, {
    pendingDocs,
    latestStage: latestApplication?.stage ?? null,
  });

  const botMessage = await prisma.chatMessage.create({
    data: { studentId: req.studentId!, sender: "BOT", message: replyText },
  });

  res.status(201).json({ userMessage, botMessage });
});

export default router;
