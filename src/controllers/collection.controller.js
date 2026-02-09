import Collection from "../models/collection.model.js";

export const getCollections = async (req, res) => {
  const items = await Collection.find();
  res.json(items);
};

export const createCollection = async (req, res) => {
  const newItem = await Collection.create(req.body);
  res.status(201).json(newItem);
};
