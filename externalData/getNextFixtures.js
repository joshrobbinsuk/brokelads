import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
// import node-schedule from 'node-schedule';
import apiHeaders from "./apiHeaders";
import { trimData } from "./nextFixtureFuncs";
import Fixture from "../schemas/fixtureSchema";
import LEAGUE_CHOICE from "./leagueOptions";

const NEXT_FIXTURES_ENDPOINT = `https://api-football-v1.p.rapidapi.com/v2/fixtures/league/${LEAGUE_CHOICE}/next/10`;

// GET NEXT FIXTURES FUNCTION
const getNextFixtures = async () => {
  // get and clean data
  const res = await axios.get(NEXT_FIXTURES_ENDPOINT, apiHeaders);
  const data = res.data.api.fixtures;
  const trimmedData = trimData(data);

  // handle next fixtures
  trimmedData.forEach((fixture) => {
    // try and update one
    Fixture.findOneAndUpdate(
      { fixture_id: fixture.fixture_id },
      {
        event_date: fixture.event_date,
        event_timestamp: fixture.event_timestamp,
        status: fixture.status,
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("getNextFixtures:", err);
        }
        // if no existing doc then write new one
        if (doc === null) {
          const newFixture = new Fixture(fixture);
          newFixture.save((err, doc) => {
            if (err) {
              console.log("getNextFixtures:", err);
            }
          });
        }
      },
    );
  });
  // return data;
};

export default getNextFixtures;
