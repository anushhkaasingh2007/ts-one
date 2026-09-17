import "dotenv/config";
import express, { type Request, type Response } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import schemeRoutes from "./routes/schemes.js";
import applicationRoutes from "./routes/applications.js";
import documentRoutes from "./routes/documents.js";
import verificationRoutes from "./routes/verification.js";
import notificationRoutes from "./routes/notifications.js";
import chatbotRoutes from "./routes/chatbot.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Local development only
if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.API_PORT) || 4000;

  app.listen(port, () => {
    console.log(`TS-One API listening on http://localhost:${port}`);
  });
}

export default app;