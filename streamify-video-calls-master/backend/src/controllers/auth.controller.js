import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";

const COOKIE_OPTIONS = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "none",
  secure: true
};

export async function signup(req, res) {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const avatarId = Math.floor(Math.random() * 100) + 1;
    const profilePic = `https://avatar.iran.liara.run/public/${avatarId}.png`;

    const user = await User.create({
      email,
      fullName,
      password,
      profilePic
    });

    await upsertStreamUser({
      id: user._id.toString(),
      name: user.fullName,
      image: user.profilePic
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, COOKIE_OPTIONS);
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, COOKIE_OPTIONS);
    res.json({ success: true, user });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
}

export function logout(req, res) {
  res.clearCookie("jwt", {
    sameSite: "none",
    secure: true
  });
  res.json({ success: true });
}
