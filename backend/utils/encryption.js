// backend/utils/encryption.js

import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.AES_SECRET_KEY;
const iv = process.env.AES_IV;

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};
