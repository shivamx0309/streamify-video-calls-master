import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import connectDB from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname= path.resolve()

// ✅ CORS (LOCAL + VERCEL)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-app-upsg.onrender.com/api",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if(process.env.NODE_EV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// START SERVER AFTER DB CONNECT
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed", err);
    process.exit(1);
  });
