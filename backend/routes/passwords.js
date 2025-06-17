// backend/routes/passwords.js

import express from "express";
import Password from "../models/Password.js";
import { verifyToken } from "../middleware/auth.js";
import { encrypt, decrypt } from "../utils/encryption.js";

const router = express.Router();

// GET all passwords for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.id });
    const decrypted = passwords.map((item) => ({
      ...item._doc,
      password: decrypt(item.password),
    }));
    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST add new password
router.post("/", verifyToken, async (req, res) => {
  console.log("HEADERS:", req.headers); 
  console.log("Decoded User:", req.user);
  const { site, username, password } = req.body;
  try {
    const encryptedPassword = encrypt(password);
    const newPass = await Password.create({
      site,
      username,
      password: encryptedPassword,
      userId: req.user.id,
    });
    res.status(201).json({ ...newPass._doc, password });
  } catch (err) {
    // console.error("❌ Error creating password:", err);
    // console.log("🔑 Key Length:", process.env.AES_SECRET_KEY.length);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update password
router.put("/:id", verifyToken, async (req, res) => {
  // console.log("🔧 PUT /passwords/:id called");
  // console.log("➡️  Params ID:", req.params.id);
  // console.log("➡️  Request Body:", req.body);
  // console.log("🔐 User ID from Token:", req.user?.id);
  const { site, username, password } = req.body;
  try {
    const encryptedPassword = encrypt(password);
    const updated = await Password.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { site, username, password: encryptedPassword },
      { new: true }
    );
    res.json({ ...updated._doc, password });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE password
router.delete("/:id", verifyToken, async (req, res) => {
  // console.log("🗑️ DELETE /passwords/:id called");
  // console.log("➡️  Params ID:", req.params.id);
  // console.log("🔐 User ID from Token:", req.user?.id);
  try {
    // ✅ Store the deleted entry in a variable
    const deleted = await Password.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    // ✅ Now you can log it
    // console.log("✅ Deleted entry:", deleted);

    // If nothing was deleted
    if (!deleted) {
      return res.status(404).json({ message: "Password not found or not authorized" });
    }

    res.json({ message: "Password deleted" });
  } catch (err) {
    // console.error("❌ Delete Error:", err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});


export default router;
