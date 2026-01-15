import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import connectDB from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS (Frontend domains ONLY)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://streamify-video-calls-master-six.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// ✅ IMPORTANT for preflight requests
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// START SERVER
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on ${PORT}`);
  });
});
