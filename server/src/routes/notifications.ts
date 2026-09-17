import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req: AuthedRequest, res) => {
  const notifications = await prisma.notification.findMany({
    where: { studentId: req.studentId },
    orderBy: { createdAt: "desc" },
  });
  res.json(notifications);
});

router.patch("/:id/read", async (req: AuthedRequest, res) => {
  const notificationId = String(req.params.id);
  const notification = await prisma.notification.findFirst({
    where: { id: notificationId, studentId: req.studentId },
  });
  if (!notification) return res.status(404).json({ error: "Notification not found" });

  const updated = await prisma.notification.update({
    where: { id: notification.id },
    data: { read: true },
  });
  res.json(updated);
});

router.patch("/read-all", async (req: AuthedRequest, res) => {
  await prisma.notification.updateMany({
    where: { studentId: req.studentId, read: false },
    data: { read: true },
  });
  res.status(204).end();
});

export default router;
