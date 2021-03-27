import dotenv from "dotenv";
dotenv.config();
import express from "express";

import db from "./database";
import middleware from "./middleware";
import { authRoutes, betRoutes, fixtureRoutes, clientRoutes } from "./routes";
import {
  testSchedule,
  testSchedule2,
  scheduleNextFixtures,
  scheduleOdds,
  scheduleResults,
  scheduleSettleBets,
  schedulePayWinners,
  PW,
  SB,
  GR,
  TT,
} from "./externalData/scheduler";

const { PORT = 4000 } = process.env;
const app = express();

middleware(app);
authRoutes(app);
betRoutes(app);
fixtureRoutes(app);
clientRoutes(app);

// * START SERVER
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
