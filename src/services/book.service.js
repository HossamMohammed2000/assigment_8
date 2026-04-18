import { getDB } from "../DB/connection.js";
import { ObjectId } from "mongodb";

const col = "books";

// ====== CREATE ======
export const create = async (data) => {
  const db = getDB();
  return await db.collection(col).insertOne(data);
};

// ====== BATCH INSERT ======
export const batch = async (data) => {
  const db = getDB();
  return await db.collection(col).insertMany(data);
};

// ====== UPDATE FUTURE ======
export const updateFuture = async () => {
  const db = getDB();
  return await db.collection(col).updateOne(
    { title: "Future" },
    { $set: { year: 2022 } }
  );
};

// ====== FIND BY TITLE ======
export const findByTitle = async (title) => {
  const db = getDB();
  return await db.collection(col).findOne({ title });
};

// ====== FIND BETWEEN YEARS ======
export const findBetweenYears = async (from, to) => {
  const db = getDB();
  return await db.collection(col)
    .find({ year: { $gte: from, $lte: to } })
    .toArray();
};

// ====== FIND BY GENRE ======
export const findByGenre = async (genre) => {
  const db = getDB();
  return await db.collection(col)
    .find({ genres: genre })
    .toArray();
};

// ====== SKIP & LIMIT ======
export const skipLimit = async () => {
  const db = getDB();
  return await db.collection(col)
    .find()
    .sort({ year: -1 })
    .skip(2)
    .limit(3)
    .toArray();
};

// ====== YEAR INTEGER ======
export const yearInteger = async () => {
  const db = getDB();
  return await db.collection(col)
    .find({ year: { $type: "int" } })
    .toArray();
};

// ====== EXCLUDE GENRES ======
export const excludeGenres = async () => {
  const db = getDB();
  return await db.collection(col)
    .find({ genres: { $nin: ["Horror", "Science Fiction"] } })
    .toArray();
};

// ====== DELETE BEFORE YEAR ======
export const deleteBeforeYear = async (year) => {
  const db = getDB();
  return await db.collection(col)
    .deleteMany({ year: { $lt: year } });
};

// ====== AGGREGATION 1 ======
export const aggregate1 = async () => {
  const db = getDB();
  return await db.collection(col).aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } }
  ]).toArray();
};

// ====== AGGREGATION 2 ======
export const aggregate2 = async () => {
  const db = getDB();
  return await db.collection(col).aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { title: 1, author: 1, year: 1 } }
  ]).toArray();
};

// ====== AGGREGATION 3 ======
export const aggregate3 = async () => {
  const db = getDB();
  return await db.collection(col).aggregate([
    { $unwind: "$genres" }
  ]).toArray();
};

// ====== AGGREGATION 4  ======
export const aggregate4 = async () => {
  const db = getDB();
  return await db.collection(col).aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "bookId",
        as: "logs"
      }
    }
  ]).toArray();
};