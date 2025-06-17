// backend/models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String, // "google" or "github"
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
