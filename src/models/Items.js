import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    amount: { type: Number },
    completed: { type: Boolean, required: true },
  },
  {
    versionKey: false,
  }
);

const Item = mongoose.model("items", itemSchema);

export default Item;
