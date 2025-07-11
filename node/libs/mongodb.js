import mongoose from "mongoose";

const connectToDatabase = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/nodem")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("Mongo DB connection error", err));
};

export default connectToDatabase;
