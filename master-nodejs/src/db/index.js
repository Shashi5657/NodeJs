import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in environment variables");
      return;
    }
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.info(`Connected to DB: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error connecting to DB", error);
    process.exit(1);
  }
};

export default connectToDB;
