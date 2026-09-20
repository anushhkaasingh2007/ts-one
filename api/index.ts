// Vercel serverless entry. Files under /api are auto-detected as functions.
// Re-exports the compiled Express app (built by `npm run build --prefix server`).
// /api/* is rewritten here via vercel.json; Express matches the original path.
import app from "../server/dist/index.js";

export default app;
