import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import tasksRoute from "./routes/tasksRoute.js";
import authRoute from "./routes/authRoute.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandller.js";

const app = express();
const port = process.env.PORT || 5000;

// Cors and body parser middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware
app.use(logger);

// Use routes
app.use("/api/tasks", tasksRoute);
app.use("/api/auth", authRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Running server
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
