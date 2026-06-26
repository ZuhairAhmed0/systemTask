import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import tasksRoute from "./routes/tasksRoute.js";
import authRoute from "./routes/authRoute.js";
import swaggerRoute from "./routes/swaggerRoute.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandller.js";

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_URL || "http://localhost:3000";

// Cors and body parser middleware
app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware
app.use(logger);

// Use routes

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Task Management API. Please use /api/tasks for task operations and /api/auth for authentication.",
  );
});
app.use("/api/tasks", tasksRoute);
app.use("/api/auth", authRoute);

// Swagger UI route (serves /api-docs)
app.use("/", swaggerRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Running server
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
