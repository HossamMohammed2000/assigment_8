import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  action: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Log", logSchema);
