import Log from "../models/log.model.js";

// Get all logs
export const getLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get log by ID
export const getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new log
export const createLog = async (req, res) => {
  try {
    const newLog = await Log.create(req.body);
    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update log
export const updateLog = async (req, res) => {
  try {
    const updatedLog = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLog) return res.status(404).json({ message: "Log not found" });
    res.json(updatedLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete log
export const deleteLog = async (req, res) => {
  try {
    const deletedLog = await Log.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: "Log not found" });
    res.json({ message: "Log deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
