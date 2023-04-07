import mongoose from "mongoose";
import Item from "../../models/Items.js";
import db from "../dbConnect.js";

const items = [
  {
    name: "Arroz",
    isCompleted: false,
  },
  {
    name: "Feijão",
    isCompleted: false,
  },
  {
    name: "Macarrão",
    isCompleted: false,
  },
  {
    name: "Azeite",
    isCompleted: false,
  },
  {
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
