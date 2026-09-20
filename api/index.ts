// Vercel serverless entry. Load the compiled Express app via dynamic import
// (a static top-level import crashes the function at load — the dynamic form
// is what the diagnostics proved works). The app is cached across invocations.
let appPromise: Promise<any> | null = null;

export default async function handler(req: any, res: any) {
  try {
    if (!appPromise) {
      appPromise = import("../server/dist/index.js").then((m) => m.default);
    }
    const app = await appPromise;
    return app(req, res);
  } catch (e: any) {
    if (!res.headersSent) {
      res.status(500).json({ handlerError: String((e && e.stack) || e).slice(0, 900) });
    }
  }
}
