// Temporary diagnostic: reports env presence, Prisma status, and app-import error.
export default async function handler(_req: unknown, res: any) {
  const out: Record<string, unknown> = {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasJwtSecret: !!process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
  };
  try {
    const mod = await import("../server/dist/lib/prisma.js");
    out.studentCount = await mod.prisma.student.count();
    out.prisma = "ok";
  } catch (e: any) {
    out.prisma = "error";
    out.prismaError = String((e && e.stack) || e).slice(0, 800);
  }
  try {
    const appMod = await import("../server/dist/index.js");
    out.appImport = typeof appMod.default;
  } catch (e: any) {
    out.appImport = "error";
    out.appError = String((e && e.stack) || e).slice(0, 800);
  }
  res.status(200).json(out);
}
