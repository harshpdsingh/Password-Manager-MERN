// backend/models/Password.js

import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    site: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String, // Will be AES encrypted
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Password", passwordSchema);
