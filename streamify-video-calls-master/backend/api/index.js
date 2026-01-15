// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import authRoutes from "../src/routes/auth.route.js";
// import userRoutes from "../src/routes/user.route.js";
// import chatRoutes from "../src/routes/chat.route.js";
// import connectDB from "../src/lib/db.js";

// dotenv.config();

// const app = express();

// // ✅ CORS (Frontend Vercel domain)
// app.use(
//   cors({
//     origin: "https://streamify-video-calls-master-six.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/chat", chatRoutes);

// // Health check
// app.get("/api", (req, res) => {
//   res.json({ success: true, message: "API running on Vercel 🚀" });
// });

// // ❗ IMPORTANT
// await connectDB();

// export default app;




import app from "../src/app.js";

export default app;

