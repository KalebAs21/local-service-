import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import path from "path";
import userRouter from "./routes/userRoute.js";
import providerRouter from "./routes/providerRoute.js";
import serviceRouter from "./routes/serviceRoute.js";
import adminRouter from "./routes/adminRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from the backend! at 5000");
});

connectDb();
//endpoints
app.use("/api/user", userRouter);
app.use("/api/provider", providerRouter)
app.use("/api/service", serviceRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
});
