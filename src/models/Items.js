import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    // amount: { type: Number },
    isCompleted: { type: Boolean, required: true },
  },
  {
    versionKey: false,
  }
);

const Item = mongoose.model("items", itemSchema);

export default Item;
