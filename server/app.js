import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// routes ==============>
import authRoutes from "./src/routes/authRoutes.js";
import blogRoutes from "./src/routes/blgoRoutes.js";
import commentsRoutes from "./src/routes/commentsRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

import { DBconnection } from "./src/config/database.js";
import errorHandlerMiddleware from "./src/middlewares/errorsHandler.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";
import { limiter } from "./src/middlewares/rate-limiter.js";
import { logger, requestLogger } from "./src/utils/logger.js";
import helmet from "helmet";
import cors from "cors";
dotenv.config();
DBconnection();

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(limiter);
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blog/comment", authMiddleware, commentsRoutes);
app.use("/api/current-user", authMiddleware, userRoutes);
app.use(requestLogger);

app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
  logger.error("url not found");
});

app.use(errorHandlerMiddleware);
