import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "../config/env.js";

if (!MONGO_URI) {
  throw new Error("Please define the mongoDb URI environment variables");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`mongoDb connected succesfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};

export default connectToDatabase;
