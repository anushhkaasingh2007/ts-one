// Vercel serverless entry point.
// Re-exports the compiled Express app (built by `npm run build --prefix server`).
// All /api/* requests are rewritten to this function via vercel.json; the Express
// app matches the original path (e.g. /api/auth/login).
import app from "../server/dist/index.js";

export default app;
