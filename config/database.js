import { config } from "dotenv";
import mongoose from "mongoose";
config();
const db_connection_string = process.env.MONGODB_URI;
console.log(db_connection_string);

async function connect(uri) {
  try {
    console.log("waiting for connection with database...");
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
export default connect(db_connection_string);
