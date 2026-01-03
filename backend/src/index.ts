import express from "express";
import notesRoutes from "./routes/notesRoutes";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import rateLimiter from "./middleware/rateLimiter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware parse json from client
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server started on PORT: ${PORT}`);
  });
});
