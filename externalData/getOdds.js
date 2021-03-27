import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";

// import node-schedule from 'node-schedule';
import Fixture from "../schemas/fixtureSchema";
import apiHeaders from "./apiHeaders";

const getOdds = async () => {
  Fixture.find({ odds: { $exists: false } }, (err, docs) => {
    if (err) {
      console.log("Find error:", err);
    }

    const noOddsFixtures = docs;
    noOddsFixtures.forEach(async (fixture) => {
      // try and update one
      const ODDS_ENDPOINT = `https://api-football-v1.p.rapidapi.com/v2/odds/fixture/${fixture.fixture_id}/label/1`;
      const res = await axios.get(ODDS_ENDPOINT, apiHeaders);

      try {
        const matchOdds = res.data.api.odds[0].bookmakers[0].bets[0].values;
        Fixture.findOneAndUpdate(
          { fixture_id: fixture.fixture_id },
          {
            $set: {
              odds: {
                home: matchOdds[0].odd,
                draw: matchOdds[1].odd,
                away: matchOdds[2].odd,
              },
            },
          },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("getOdds:", err);
            }
          },
        );
      } catch (err) {
        console.log(
          `noOdds/${fixture.homeTeam.team_name}/${fixture.awayTeam.team_name}:`,
          err,
        );
      }
    });
  });
};

export default getOdds;
