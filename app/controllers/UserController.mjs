import express from "express";
import { expressjwt } from "express-jwt";

const router = express.Router();

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => {
    if (req.cookies && req.cookies.Authorization) {
      return req.cookies.Authorization;
    }
    return null;
  },
});

export const get = (req, res) => {
  res.sendFile(path.resolve("./user.html"));
};

export default router;
