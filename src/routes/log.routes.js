import express from "express";
import {
  getLogs,
  getLogById,
  createLog,
  updateLog,
  deleteLog
} from "../controllers/log.controller.js";

const router = express.Router();

router.get("/", getLogs);
router.get("/:id", getLogById);
router.post("/", createLog);
router.put("/:id", updateLog);
router.delete("/:id", deleteLog);

export default router;
