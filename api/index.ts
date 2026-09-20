// Vercel serverless entry. Wraps the compiled Express app and surfaces any
// synchronous invocation error instead of an opaque FUNCTION_INVOCATION_FAILED.
import app from "../server/dist/index.js";

export default function handler(req: any, res: any) {
  try {
    return (app as any)(req, res);
  } catch (e: any) {
    if (!res.headersSent) {
      res.status(500).json({ handlerError: String((e && e.stack) || e).slice(0, 900) });
    }
  }
}
