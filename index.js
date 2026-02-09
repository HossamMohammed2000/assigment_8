import "dotenv/config.js";
import express from "express";
import { connectDB } from "./src/DB/connection.js";

import bookRoutes from "./src/routes/book.routes.js";
import logRoutes from "./src/routes/log.routes.js";
import collectionRoutes from "./src/routes/collection.routes.js";

import Book from "./src/models/book.model.js";
import Log from "./src/models/log.model.js";

const app = express();
app.use(express.json());
await connectDB();


async function addSampleData() {
  try {
    if ((await Book.countDocuments()) === 0) {
      await Book.insertMany([
        { title: "Book One", author: "Hossam", year: 2026 },
        { title: "Book Two", author: "Ahmed", year: 2025 }
      ]);
      console.log("✅ Sample Books added");
    }

    if ((await Log.countDocuments()) === 0) {
      await Log.insertMany([
        { action: "Server started" },
        { action: "Sample book added" }
      ]);
      console.log("✅ Sample Logs added");
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
export { Book, Log };