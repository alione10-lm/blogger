import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  NODE_ENV: process.env.NODE_ENV,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  TOKEN_EXIPRES_IN: process.env.TOKEN_EXIPRES_IN,
};
