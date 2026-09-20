// Diagnostic: zero-dependency function to test whether Vercel detects /api.
export default function handler(_req: unknown, res: any) {
  res.status(200).json({ ping: "ok" });
}
