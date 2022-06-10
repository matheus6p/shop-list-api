import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_URL_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

export default db;
