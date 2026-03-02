import express from "express";
import { expressjwt } from "express-jwt";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export const authenticateToken = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
});

export const get = (req, res) => {
  res.status(200).json({
    message: "Access granted",
    user: req.auth,
  });
};

export default router;
