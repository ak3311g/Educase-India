import "dotenv/config";
import express from "express";
import cors from "cors";
import { checkDB } from "./config/db.js";

import schoolRoutes from "./routes/school.routes.js"

const PORT = process.env.PORT || 3000;

const app = express();

/* app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
); */

app.use(express.json())

async function loadingServer() {
  await checkDB();

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.use("/api/school", schoolRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

loadingServer();