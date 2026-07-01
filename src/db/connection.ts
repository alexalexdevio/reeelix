import mongoose from "mongoose";
import Logger from "@ptkdev/logger";
import { config } from "../config";

const logger = new Logger();

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.mongo.uri);
    logger.info("✅ MongoDB connected");
  } catch (error) {
    logger.error(`❌ MongoDB connection error: ${error}`);
    process.exit(1);
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  await mongoose.disconnect();
  console.log("MongoDB disconnected");
}

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB connection lost");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});
