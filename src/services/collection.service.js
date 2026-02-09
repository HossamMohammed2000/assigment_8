import mongoose from "mongoose";

export const createBooks = () =>
  mongoose.connection.createCollection("books", {
    validator: {
      $jsonSchema: {
        required: ["title"],
        properties: { title: { bsonType: "string", minLength: 1 } },
      },
    },
  });

export const createAuthors = () =>
  mongoose.connection.collection("authors").insertOne({ name: "Author" });

export const createLogs = () =>
  mongoose.connection.createCollection("logs", { capped: true, size: 1024 * 1024 });

export const createIndex = () =>
  mongoose.connection.collection("books").createIndex({ title: 1 });
