import { configDotenv } from "dotenv";
import connectToDB from "./db/index.js";

configDotenv();

connectToDB();
