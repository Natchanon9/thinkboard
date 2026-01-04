import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { Request, Response } from "express";

import notesRoutes from "./routes/notesRoutes";
import { connectDB } from "./config/db";
import rateLimiter from "./middleware/rateLimiter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
if (process.env.NODE_ENV !== "prod") {
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "prod") {
  // In production, serve frontend static files
  // __dirname is /backend/dist
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  // Fallback to index.html for all non-API routes (SPA routing)
  app.use((_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on PORT: ${PORT}`);
  });
});
