import { getDB } from "../DB/connection.js";

// ====== CREATE BOOKS COLLECTION WITH VALIDATION ======
export const createBooks = async () => {
  const db = getDB();

  return await db.createCollection("books", {
    validator: {
      $jsonSchema: {
        required: ["title"],
        properties: {
          title: { bsonType: "string", minLength: 1 },
        },
      },
    },
  });
};

// ====== CREATE AUTHORS + INSERT DEFAULT ======
export const createAuthors = async () => {
  const db = getDB();

  return await db.collection("authors").insertOne({
    name: "Author",
  });
};

// ====== CREATE LOGS  ======
export const createLogs = async () => {
  const db = getDB();

  return await db.createCollection("logs", {
    capped: true,
    size: 1024 * 1024,
  });
};

// ====== CREATE INDEX ======
export const createIndex = async () => {
  const db = getDB();

  return await db.collection("books").createIndex({
    title: 1,
  });
};