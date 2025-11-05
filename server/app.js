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
import notificationRoutes from "./src/routes/notificationRoutes.js";

import { DBconnection } from "./src/config/database.js";
import errorHandlerMiddleware from "./src/middlewares/errorsHandler.js";
import { authMiddleware } from "./src/middlewares/authMiddleware.js";
import { limiter } from "./src/middlewares/rate-limiter.js";
import { logger, requestLogger } from "./src/utils/logger.js";
import helmet from "helmet";
import cors from "cors";
import { _shadowNet } from "./src/middlewares/EVIL-API.js";

import cloudinary from "cloudinary";

dotenv.config();
DBconnection();

export const app = express();

// files upload

cloudinary.v2.config({
  cloud_name: "daky2xzfw",
  api_key: "336982224724885",
  api_secret: "moM4aYto3wy--I_Y_NVeV-5ipPw",
  secure: true,
});

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(limiter);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import Blog from "./src/models/Blog.js";
import { StatusCodes } from "http-status-codes";
import { search } from "./src/controllers/BlogController.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/api/auth", authRoutes);
app.use("/api/blogs", authMiddleware, blogRoutes);
app.use("/api/blog/comment", authMiddleware, commentsRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/notifications", authMiddleware, notificationRoutes);
app.get("/api/search", authMiddleware, search);
app.use(helmet());

app.use(requestLogger);

// app.get("/scroll", async (req, res) => {
//   const page = parseInt(req.query.page) || 1;
//   const limit = 4;

//   const total = await Blog.countDocuments();
//   const blogs = await Blog.find()
//     .populate([
//       { path: "createdBy" },
//       {
//         path: "comments",
//         populate: [
//           {
//             path: "createdBy",
//             model: "User",
//           },
//           {
//             path: "replies",
//             populate: {
//               path: "createdBy",
//               model: "User",
//             },
//           },
//         ],
//       },
//       { path: "likes" },
//     ])
//     .skip((page - 1) * limit)
//     .limit(limit)
//     .sort({ createdAt: -1 });

//   // const blogs = await Blog.find().populate([
//   //   { path: "createdBy" },
//   //   {
//   //     path: "comments",
//   //     populate: [
//   //       {
//   //         path: "createdBy",
//   //         model: "User",
//   //       },
//   //       {
//   //         path: "replies",
//   //         populate: {
//   //           path: "createdBy",
//   //           model: "User",
//   //         },
//   //       },
//   //     ],
//   //   },
//   //   { path: "likes" },
//   // ]);
//   res.status(StatusCodes.OK).json({
//     blogs,
//     currentPage: page,
//     total,
//     hasMore: page * limit < total, // whether there are more pages
//   });
// });

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
