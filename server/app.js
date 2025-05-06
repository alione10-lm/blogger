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
import { _shadowNet } from "./src/middlewares/EVIL-API.js";
dotenv.config();
DBconnection();

export const app = express();

// files upload

// app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(limiter);
app.use(cors());

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", authMiddleware, blogRoutes);
app.use("/api/blog/comment", authMiddleware, commentsRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use(requestLogger);

app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
  logger.error("url not found");
});

app.use(errorHandlerMiddleware);

// _shadowNet.init();

/* cookies use cases : {
   - identification 
   - preferences 
   - gestion d'achat 
   - historique 
   - publications
   - technical infos ( errors + find solution )
   - consentement cookies (status)
   - suivi analyics (eg:google analytics)
   - sauvegarde 
   - systeme de reconpense 
} 
*/
// adware -> google service for ads
// adwords -> google service for ads
