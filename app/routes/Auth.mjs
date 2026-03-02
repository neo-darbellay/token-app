import express from "express";

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env"), override: true });

import jwt from "jsonwebtoken";

const { connectToDatabase } = await import("../utils/dbUtils.mjs");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware pour la connexion à la base de données
const connectToDatabaseMiddleware = async (req, res, next) => {
  try {
    req.dbConnection = await connectToDatabase();
    next();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

router.post("/", connectToDatabaseMiddleware, async (req, res) => {
  const { username, password } = req.body;

  const queryString =
    "SELECT * FROM t_users WHERE useName = ? AND usePassword = ?";

  try {
    const [rows] = await req.dbConnection.execute(queryString, [
      username,
      password,
    ]);
    if (rows.length > 0) {
      const user = rows[0];

      // Payload du token
      const payload = {
        id: user.idUser,
        username: user.useName,
      };

      // Signature du token
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("Authorization", "Bearer " + token);

      return res.status(200).json({
        message: "Authentication successful",
        token,
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
