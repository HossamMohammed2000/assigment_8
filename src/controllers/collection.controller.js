import { getDB } from "../DB/connection.js";

export const getCollections = async (req, res) => {
  try {
    const db = getDB();
    const items = await db.collection("collections").find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("collections").insertOne(req.body);

    res.status(201).json({
      _id: result.insertedId,
      ...req.body,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
