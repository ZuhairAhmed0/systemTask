import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const err = new Error("Username, email, and password are required");
    err.status = 400;
    return next(err);
  }

  const hashedPassword = await bcrypt.hash(password, 16);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    const err = new Error("Failed to create user");
    err.status = 500;
    return next(err);
  }
  res.status(201).json({
    username: user.username,
  });
};

// @desc    Login a user
// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.status = 400;
    return next(err);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

    if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    return next(err);
  }

  const match = await bcrypt.compare(password, user.password);
  const accessToken = jwt.sign(
    { email: user.email , id: user.id},
    process.env.ACCESS_TOKEN_SECRET,
  );


  if (!match) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    return next(err);
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  
  res.status(200).json({
    username: user.username,
  });
};

// @desc logout a user
// @route POST /api/auth/logout
export const checkAuth = async (req, res) => {
  const { email } = req.user;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  res.status(200).json({ username: user.username });
};

// @desc logout a user
// @route POST /api/auth/logout
export const logoutUser = async (req, res) => {
  // In a real application, you would handle token invalidation or session destruction here
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "User logged out successfully" });
};
