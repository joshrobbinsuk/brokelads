import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
// import node-schedule from 'node-schedule';

import Fixture from "../schemas/fixtureSchema";
import Bet from "../schemas/betSchema";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const settleBets = async () => {
  Fixture.find({ status: "Finished" }, (err, docs) => {
    if (err) {
      console.log("settleBets:", err);
    }
    const results = docs;
    results.forEach(async (result) => {
      const outcome =
        result.goalsHomeTeam > result.goalsAwayTeam
          ? "home"
          : result.goalsHomeTeam < result.goalsAwayTeam
          ? "away"
          : "draw";

      Bet.updateMany(
        { status: "unsettled", fixture: result._id },
        {
          outcome: outcome,
          status: "settled",
        },
        // { new: true },
        (err, doc) => {
          if (err) {
            console.log("settleBets:", err);
          }
        },
      );
    });
  });
};

export default settleBets;
