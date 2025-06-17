// backend/passport/github.js

import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          provider: "github",
          providerId: profile.id,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          email: profile.emails?.[0]?.value || `github-${profile.id}@noemail.com`, // GitHub doesn't always give email
          provider: "github",
          providerId: profile.id,
        });

        return done(null, newUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
