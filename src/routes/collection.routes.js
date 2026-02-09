import express from "express";
import { getCollections, createCollection } from "../controllers/collection.controller.js";

const router = express.Router();

router.get("/", getCollections);
router.post("/", createCollection);

export default router;
