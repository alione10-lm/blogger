import mongoose from "mongoose";
import { ENV } from "./dotenv.js";

const DBconnection = async () => {
  try {
    const connection = await mongoose.connect(ENV.MONGO_URL);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { DBconnection };
