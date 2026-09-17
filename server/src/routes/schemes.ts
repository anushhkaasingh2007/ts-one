import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  const schemes = await prisma.scheme.findMany({ orderBy: { name: "asc" } });
  res.json(schemes);
});

export default router;
