import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
// import node-schedule from 'node-schedule';
import apiHeaders from "./apiHeaders";
import Fixture from "../schemas/fixtureSchema";
import LEAGUE_CHOICE from "./leagueOptions";

const LAST_FIXTURES_ENDPOINT = `https://api-football-v1.p.rapidapi.com/v2/fixtures/league/${LEAGUE_CHOICE}/last/10`;

const getResults = async () => {
  const res = await axios.get(LAST_FIXTURES_ENDPOINT, apiHeaders);

  const results = res.data.api.fixtures.filter(
    (r) => r.status === "Match Finished",
  );

  results.forEach(async (result) => {
    Fixture.findOneAndUpdate(
      {
        status: "Not Started",
        fixture_id: result.fixture_id,
      },
      {
        goalsAwayTeam: result.goalsAwayTeam,
        goalsHomeTeam: result.goalsHomeTeam,
        status: "Finished",
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("getResults:", err);
        }
      },
    );
  });
};

export default getResults;
