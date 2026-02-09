import Book from "../models/book.model.js";

export const create = (data) => Book.create(data);
export const batch = (data) => Book.insertMany(data);
export const updateFuture = () =>
  Book.updateOne({ title: "Future" }, { $set: { year: 2022 } });
export const findByTitle = (title) => Book.findOne({ title });
export const findBetweenYears = (from, to) =>
  Book.find({ year: { $gte: from, $lte: to } });
export const findByGenre = (genre) => Book.find({ genres: genre });
export const skipLimit = () => Book.find().sort({ year: -1 }).skip(2).limit(3);
export const yearInteger = () => Book.find({ year: { $type: "int" } });
export const excludeGenres = () =>
  Book.find({ genres: { $nin: ["Horror", "Science Fiction"] } });
export const deleteBeforeYear = (year) =>
  Book.deleteMany({ year: { $lt: year } });
export const aggregate1 = () =>
  Book.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $sort: { year: -1 } },
  ]);
export const aggregate2 = () =>
  Book.aggregate([
    { $match: { year: { $gt: 2000 } } },
    { $project: { title: 1, author: 1, year: 1 } },
  ]);
export const aggregate3 = () => Book.aggregate([{ $unwind: "$genres" }]);
export const aggregate4 = () =>
  Book.aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "_id",
        foreignField: "bookId",
        as: "logs",
      },
    },
  ]);
