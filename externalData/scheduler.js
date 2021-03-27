import { scheduleJob, RecurrenceRule, Range } from "node-schedule";
// * https://www.npmjs.com/package/node-schedule *

import {
  getNextFixtures,
  getOdds,
  getResults,
  settleBets,
  payWinners,
} from "./";

export const testSchedule = scheduleJob("0 34 * * * *", () => {
  console.log("scheduler is working: it is 34 past the hour in GB");
});

export const testSchedule2 = scheduleJob("0 35 16 * * *", () => {
  console.log("scheduler is in the right time zone: it is 16:35 in GB");
});

// fixtures
export const scheduleNextFixtures = scheduleJob("0 55 11 * * *", () => {
  console.log("schedule getNextFixtures");
  getNextFixtures();
});

// odds
export const scheduleOdds = scheduleJob("0 57 11 * * *", () => {
  console.log("schedule getOdds");
  getOdds();
});

// results
export const scheduleResults = scheduleJob("0 0 20 * * *", () => {
  console.log("schedule getResults");
  getResults();
});

// settle bets
export const scheduleSettleBets = scheduleJob("0 2 20 * * *", () => {
  console.log("schedule settleBets");
  settleBets();
});

//  pay winners
export const schedulePayWinners = scheduleJob("0 4 20 * * *", () => {
  console.log("schedule payWinners");
  payWinners();
});

// Recurrence
const ruleGR = new RecurrenceRule();
ruleGR.hour = [0, new Range(13, 22)];
ruleGR.minute = 0;

export const GR = scheduleJob(ruleGR, function () {
  console.log("schedule getResults");
  getResults();
});

const ruleSB = new RecurrenceRule();
ruleSB.hour = [0, new Range(13, 22)];
ruleSB.minute = 2;

export const SB = scheduleJob(ruleSB, function () {
  console.log("schedule settleBets");
  settleBets();
});

const rulePW = new RecurrenceRule();
rulePW.hour = [0, new Range(13, 22)];
rulePW.minute = 4;

export const PW = scheduleJob(rulePW, function () {
  console.log("schedule payWinners");
  payWinners();
});

const ruleTest = new RecurrenceRule();
ruleTest.hour = [0, new Range(6, 22)];
ruleTest.minute = 33;

export const TT = scheduleJob(ruleTest, function () {
  console.log("The range scheduler is working");
});
