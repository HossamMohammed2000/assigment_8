import { getDB } from "../DB/connection.js";

const col = "logs";

export const create = async (data) => {
  const db = getDB();
  return await db.collection(col).insertOne(data);
};

export const createMany = async (data) => {
  const db = getDB();
  return await db.collection(col).insertMany(data);
};

export const find = async () => {
  const db = getDB();
  return await db.collection(col).find().toArray();
};
