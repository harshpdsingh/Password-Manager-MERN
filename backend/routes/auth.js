// backend/routes/auth.js

import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Trigger Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));

// OAuth callback URL
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect with token as query param (Frontend will pick this up)
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);

// GitHub OAuth
router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  }
);


export default router;
