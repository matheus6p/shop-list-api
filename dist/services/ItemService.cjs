"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/ItemService.ts
var ItemService_exports = {};
__export(ItemService_exports, {
  ItemService: () => ItemService
});
module.exports = __toCommonJS(ItemService_exports);

// src/models/Items.ts
var import_mongoose = require("mongoose");
var itemSchema = new import_mongoose.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true }
  },
  {
    versionKey: false
  }
);
var Item = (0, import_mongoose.model)("items", itemSchema);
var Items_default = Item;

// src/services/ItemService.ts
var ItemService = class {
  async getAllItems() {
    const items = await Items_default.find();
    return items;
  }
  async addItem(item) {
    const newItem = new Items_default(item).save();
    return newItem;
  }
  async toggleItemCompleted(id) {
    const item = await Items_default.findById(id);
    if (!item)
      throw new Error("Item not found");
    item.isCompleted = !item.isCompleted;
    const editedItem = await item.save();
    return editedItem;
  }
  async deleteItem(id) {
    const itemExists = await Items_default.findById(id);
    if (!itemExists)
      throw new Error("Item not found");
    const filter = {
      _id: itemExists._id
    };
    await Items_default.deleteOne(filter);
    return { message: "Item deleted" };
  }
  async clearList() {
    await Items_default.deleteMany({});
    return { message: "Tudo limpo por aqui" };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemService
});
