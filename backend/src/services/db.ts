import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const uri = process.env.MONGO_URL ?? "";
if (!uri) throw new Error("MONGO_URL not set in .env");

mongoose
  .connect(uri)
  .then(() => console.log("✓ Mongo connected"))
  .catch(err => {
    console.error("Mongo connection error →", err.message);
    process.exit(1);
  });

export const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
    prompt: { type: String, required: true },
    answer: { type: String, required: true },
    ts: { type: Date, default: Date.now },
  })
);


