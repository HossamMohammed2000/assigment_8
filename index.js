import "dotenv/config.js";
import express from "express";
import { connectDB } from "./src/DB/connection.js";

import bookRoutes from "./src/routes/book.routes.js";
import logRoutes from "./src/routes/log.routes.js";
import collectionRoutes from "./src/routes/collection.routes.js";

const app = express();
app.use(express.json());

await connectDB();

async function addSampleData() {
  try {
    const db = (await import("./src/DB/connection.js")).getDB();

    if ((await db.collection("books").countDocuments()) === 0) {
      await db.collection("books").insertMany([
        { title: "Book One", author: "Hossam", year: 2026 },
        { title: "Book Two", author: "Ahmed", year: 2025 },
      ]);
      console.log(" Sample Books added");
    }

    if ((await db.collection("logs").countDocuments()) === 0) {
      await db
        .collection("logs")
        .insertMany([
          { action: "Server started" },
          { action: "Sample book added" },
        ]);
      console.log(" Sample Logs added");
    }
  } catch (err) {
    console.error(err);
  }
}

await addSampleData();

app.use("/books", bookRoutes);
app.use("/logs", logRoutes);
app.use("/collection", collectionRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
