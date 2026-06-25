import { connect } from "mongoose";
import { Animal } from "../models/animal.js";

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await connect(mongoUrl);
    console.log("✅ MongoDB connection established successfully");

    await Animal.syncIndexes();
    console.log("Indexes synced successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};
