import express from "express";
import { get, authenticateToken } from "../controllers/UserController.mjs";

const router = express.Router();
router.get("/", authenticateToken, get);

export default router;
