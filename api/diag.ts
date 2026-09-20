// Temporary diagnostic: reports env presence and the exact Prisma init/query error.
export default async function handler(_req: unknown, res: any) {
  const out: Record<string, unknown> = {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlPrefix: (process.env.DATABASE_URL || "").slice(0, 15),
    hasJwtSecret: !!process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
  };
  try {
    const mod = await import("../server/dist/lib/prisma.js");
    out.studentCount = await mod.prisma.student.count();
    out.prisma = "ok";
  } catch (e: any) {
    out.prisma = "error";
    out.error = String((e && e.message) || e).slice(0, 500);
  }
  res.status(200).json(out);
}
