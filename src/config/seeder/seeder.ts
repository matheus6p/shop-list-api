import mongoose from "mongoose";
import Item from "../../models/Items";
import db from "../dbConnect";
import { v4 as uuidv4 } from "uuid";

const items = [
  {
    _id: uuidv4(),
    name: "Arroz",
    isCompleted: false,
  },
  {
    _id: uuidv4(),
    name: "Feijão",
    isCompleted: false,
  },
  {
    _id: uuidv4(),
    name: "Macarrão",
    isCompleted: false,
  },
  {
    _id: uuidv4(),
    name: "Azeite",
    isCompleted: false,
  },
  {
    _id: uuidv4(),
    name: "Sal",
    isCompleted: false,
  },
];

db.on("error", console.log.bind(console, "Erro de Conexão"));
db.once("open", () => console.log("Conexão com o banco feita com sucesso."));

async function seed() {
  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log("Dados inseridos com sucesso");
  mongoose.disconnect();
}

seed();
