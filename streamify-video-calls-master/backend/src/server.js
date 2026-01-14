import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import connectDB from "./lib/db.js";

dotenv.config(); // ✅ VERY IMPORTANT

const app = express();

// ✅ SAFE PORT (local + production)
const PORT = process.env.PORT || 5001;

// ✅ CORS (local + production)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://your-frontend.vercel.app" // ⬅️ change this
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// ✅ Health check (Railway/Render useful)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Start server AFTER DB connect
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed ❌", err);
    process.exit(1);
  });
