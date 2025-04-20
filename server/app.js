import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// routes ==============>
import authRoutes from "./src/routes/authRoutes.js";
import blogRoutes from "./src/routes/blgoRoutes.js";
import commentsRoutes from "./src/routes/commentsRoutes.js";

import { DBconnection } from "./src/config/database.js";
import errorHandlerMiddleware from "./src/middlewares/errorsHandler.js";
import { logger } from "./src/utils/logger.js";

dotenv.config();
DBconnection();

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/blog/comment", commentsRoutes);

app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use(errorHandlerMiddleware);

// app.use((err, req, res, next) => {
//   const { statusCode } = err || StatusCodes.INTERNAL_SERVER_ERROR;
//   const message = err.message || "something went wrong !";
//   res.status(statusCode).json({ message });
// });

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log("connected !");
//     });
//   })
//   .catch((err) => console.log(err));

// helmet ,  rate-limiter  , winston , jest , mail buster(domain)  , node sender , node mailer , sender grid , crudder (jms:[]) , => tokens  (to see more infos about the user)
// googleAuthProvider => passport-20
// GNU to generate reamde.md
