import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const fixtureSchema = new Schema({
  fixture_id: Number,
  event_date: Date,
  event_timestamp: Number,
  venue: String,
  homeTeam: {
    team_id: Number,
    team_name: String,
    logo: String,
  },
  awayTeam: {
    team_id: Number,
    team_name: String,
    logo: String,
  },
  goalsHomeTeam: Number,
  goalsAwayTeam: Number,
  status: String,
  odds: {
    home: Number,
    away: Number,
    draw: Number,
  },
});

const Fixture = mongoose.model("Fixture", fixtureSchema, "fixtures");

export default Fixture;
