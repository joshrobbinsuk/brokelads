import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const betSchema = new Schema({
  fixture: { type: ObjectId, ref: "Fixture" },
  user: { type: ObjectId, ref: "User" },
  prediction: String,
  stake: Number,
  potentialWinnings: Number,
  outcome: String,
  status: String,
  paid: { type: String, default: "unpaid" },
});

const Bet = mongoose.model("Bet", betSchema, "bets");

export default Bet;
