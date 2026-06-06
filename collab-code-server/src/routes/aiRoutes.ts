import express from "express";
import { askAI } from "../controllers/aiController";

const router = express.Router();

// AI Assistant Route
router.post("/", askAI);

export default router;
