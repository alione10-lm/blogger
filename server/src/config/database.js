import mongoose from "mongoose";

const DBconnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export { DBconnection };
