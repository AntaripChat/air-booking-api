import mongoose from "mongoose";

export async function connectDB() {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    throw new Error("MONGO_URL is missing in .env file");
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB error:", err);
    process.exit(1);
  }
}

