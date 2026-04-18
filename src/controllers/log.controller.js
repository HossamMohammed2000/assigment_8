import { getDB } from "../DB/connection.js";
import { ObjectId } from "mongodb";

// Get all logs
export const getLogs = async (req, res) => {
  try {
    const db = getDB();
    const logs = await db.collection("logs").find().toArray();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get log by ID
export const getLogById = async (req, res) => {
  try {
    const db = getDB();
    const log = await db.collection("logs").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!log) return res.status(404).json({ message: "Log not found" });

    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new log
export const createLog = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("logs").insertOne(req.body);

    res.status(201).json({
      _id: result.insertedId,
      ...req.body,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update log
export const updateLog = async (req, res) => {
  try {
    const db = getDB();

    const result = await db
      .collection("logs")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
        { returnDocument: "after" },
      );

    if (!result.value)
      return res.status(404).json({ message: "Log not found" });

    res.json(result.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete log
export const deleteLog = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("logs").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Log not found" });

    res.json({ message: "Log deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
