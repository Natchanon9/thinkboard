import express from "express";
import notesRoutes from "./routes/notesRoutes";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();
app.use("/api/notes", notesRoutes);
app.listen(PORT, () => {
  console.log(`server started on PORT: ${PORT}`);
});
