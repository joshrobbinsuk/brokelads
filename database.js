import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB } = process.env;

https: mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("DB CONNECTED");
});
//mongoosejs.com/docs/deprecations.html#findandmodify
https: mongoose.set("useFindAndModify", false);

export default db;
