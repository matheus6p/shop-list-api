import express from "express";
import {
  addItem,
  getItems,
  editItem,
  deleteItem,
  clearList,
} from "../controller/ItemController";

const router = express.Router();

router
  .post("/addItem", addItem)
  .get("/items", getItems)
  .put("/items/:id", editItem)
  .get("/items/completed/:id", editItem)
  .delete("/items/:id", deleteItem)
  .delete("/deleteAll", clearList);

export default router;
