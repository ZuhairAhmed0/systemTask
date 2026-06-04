import express from "express";
import {
  getTasks,
  addNewTask,
  updateTask,
  deleteTask,
  clearCompletedTasks,
} from "../controllers/taskController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Get all tasks
router.get("/", authenticateUser, getTasks);

// Create a new task
router.post("/", authenticateUser, addNewTask);

// Clear completed tasks
router.delete("/clear-completed", authenticateUser, clearCompletedTasks);

// Update task
router.put("/:id", authenticateUser, updateTask);

// Delete task
router.delete("/:id", authenticateUser, deleteTask);



export default router;
