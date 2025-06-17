// backend/passport/google.js

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          provider: "google",
          providerId: profile.id,
        });

        if (existingUser) {
          return done(null, existingUser); // user found, proceed
        }

        const newUser = await User.create({
          email: profile.emails[0].value,
          provider: "google",
          providerId: profile.id,
        });

        return done(null, newUser); // user created
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
