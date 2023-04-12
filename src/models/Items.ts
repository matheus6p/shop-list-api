import { Schema, model } from "mongoose";

export interface ItemModel {
  _id?: string;
  name: string;
  isCompleted: boolean;
}

const itemSchema = new Schema<ItemModel>(
  {
    _id: { type: String },
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
  },
  {
    versionKey: false,
  }
);

const Item = model("items", itemSchema);

export default Item;
