import mongoose, {ConnectOptions} from "mongoose";
import "dotenv/config";

const MONGO_URI: string = process.env.MONGODB_URL_CONNECTION || ""

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;

export default db;
