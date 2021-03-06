import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  balance: Number,
});

const User = mongoose.model("Users", userSchema, "users");

export default User;
