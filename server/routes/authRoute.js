import express from "express";
import {
  registerUser,
  loginUser,
  checkAuth,
  logoutUser,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Logout user
router.post("/logout", logoutUser);

// Check user
router.get("/check", authenticateUser, checkAuth);
export default router;
