import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthedRequest } from "../middleware/auth.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Valid email and password are required" });
  }
  const { email, password } = parsed.data;

  const student = await prisma.student.findUnique({ where: { email } });
  if (!student) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const valid = await bcrypt.compare(password, student.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ studentId: student.id }, JWT_SECRET, { expiresIn: "7d" });
  const { passwordHash: _passwordHash, ...safeStudent } = student;
  res.json({ token, student: safeStudent });
});

router.get("/me", requireAuth, async (req: AuthedRequest, res) => {
  const student = await prisma.student.findUnique({ where: { id: req.studentId } });
  if (!student) return res.status(404).json({ error: "Student not found" });
  const { passwordHash: _passwordHash, ...safeStudent } = student;
  res.json(safeStudent);
});

export default router;
