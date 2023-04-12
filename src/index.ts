import express from "express";
import cors from "cors";
import db from "./config/dbConnect";
import ItemRoutes from "./routes/ItemRoutes";

db.on("error", console.log.bind(console, "Erro de Conexão"));
db.once("open", () => console.log("Conexão com o banco feita com sucesso."));

const app = express();

app.use(express.json());
app.use(cors());

app.use(ItemRoutes);

export default app;
