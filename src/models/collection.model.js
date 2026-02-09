import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  name: String,
  items: [String],
});

export default mongoose.model("Collection", collectionSchema);
