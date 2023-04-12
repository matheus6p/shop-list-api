"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express2 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);

// src/config/dbConnect.ts
var import_mongoose = __toESM(require("mongoose"), 1);
var import_config = require("dotenv/config");
var MONGO_URI = process.env.MONGODB_URL_CONNECTION || "";
import_mongoose.default.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = import_mongoose.default.connection;
var dbConnect_default = db;

// src/routes/ItemRoutes.ts
var import_express = __toESM(require("express"), 1);

// src/models/Items.ts
var import_mongoose2 = require("mongoose");
var itemSchema = new import_mongoose2.Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    isCompleted: { type: Boolean, required: true }
  },
  {
    versionKey: false
  }
);
var Item = (0, import_mongoose2.model)("items", itemSchema);
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

// src/controller/ItemController.ts
var itemService = new ItemService();
async function getItems(req, res) {
  try {
    const items = await itemService.getAllItems();
    return res.status(200).json(items);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
async function addItem(req, res) {
  const item = req.body;
  if (!item) {
    return res.status(404).send();
  }
  try {
    const newItem = await itemService.addItem(item);
    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}
async function editItem(req, res) {
  const { id } = req.params;
  try {
    const editedItem = await itemService.toggleItemCompleted(id);
    res.status(200).json({ message: "Updated", editedItem });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
async function deleteItem(req, res) {
  const { id } = req.params;
  try {
    const deleteItem2 = await itemService.deleteItem(id);
    return res.status(204).send(deleteItem2);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}
async function clearList(req, res) {
  try {
    const result = await itemService.clearList();
    return res.status(204).send({ message: "Tudo limpo por aqui", result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// src/routes/ItemRoutes.ts
var router = import_express.default.Router();
router.post("/addItem", addItem).get("/items", getItems).put("/items/:id", editItem).get("/items/completed/:id", editItem).delete("/items/:id", deleteItem).delete("/deleteAll", clearList);
var ItemRoutes_default = router;

// src/index.ts
dbConnect_default.on("error", console.log.bind(console, "Erro de Conex\xE3o"));
dbConnect_default.once("open", () => console.log("Conex\xE3o com o banco feita com sucesso."));
var app = (0, import_express2.default)();
app.use(
  (0, import_cors.default)({
    methods: "GET,POST,PATCH,DELETE,OPTIONS",
    optionsSuccessStatus: 200,
    origin: "https://shop-list-kappa.vercel.app"
  })
);
app.options("*", (0, import_cors.default)());
app.use(import_express2.default.json());
app.use(ItemRoutes_default);
var src_default = app;

// src/server.ts
var port = 3333;
src_default.listen(process.env.PORT || port, () => console.log(`Server Running at ${port}`));
