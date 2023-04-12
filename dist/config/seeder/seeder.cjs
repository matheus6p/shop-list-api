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

// src/config/seeder/seeder.ts
var import_mongoose3 = __toESM(require("mongoose"), 1);

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

// src/config/dbConnect.ts
var import_mongoose2 = __toESM(require("mongoose"), 1);
var import_config = require("dotenv/config");
var MONGO_URI = process.env.MONGODB_URL_CONNECTION || "";
import_mongoose2.default.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = import_mongoose2.default.connection;
var dbConnect_default = db;

// src/config/seeder/seeder.ts
var import_uuid = require("uuid");
var items = [
  {
    _id: (0, import_uuid.v4)(),
    name: "Arroz",
    isCompleted: false
  },
  {
    _id: (0, import_uuid.v4)(),
    name: "Feij\xE3o",
    isCompleted: false
  },
  {
    _id: (0, import_uuid.v4)(),
    name: "Macarr\xE3o",
    isCompleted: false
  },
  {
    _id: (0, import_uuid.v4)(),
    name: "Azeite",
    isCompleted: false
  },
  {
    _id: (0, import_uuid.v4)(),
    name: "Sal",
    isCompleted: false
  }
];
dbConnect_default.on("error", console.log.bind(console, "Erro de Conex\xE3o"));
dbConnect_default.once("open", () => console.log("Conex\xE3o com o banco feita com sucesso."));
async function seed() {
  await Items_default.deleteMany({});
  await Items_default.insertMany(items);
  console.log("Dados inseridos com sucesso");
  import_mongoose3.default.disconnect();
}
seed();
