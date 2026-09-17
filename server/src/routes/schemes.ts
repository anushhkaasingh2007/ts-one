import { Router, type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const schemes = await prisma.scheme.findMany({
    orderBy: { name: "asc" }
  });
  res.json(schemes);
});

export default router;
