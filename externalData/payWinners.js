import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
// import node-schedule from 'node-schedule';

import User from "../schemas/userSchema";
import Bet from "../schemas/betSchema";

const { Schema } = mongoose;
const { ObjectId } = Schema;

const payWinners = async () => {
  await Bet.find({ status: "settled", paid: "unpaid" }, (err, docs) => {
    if (err) {
      console.log("payWinners:", err);
    }
    const bets = docs;
    bets.forEach((bet) => {
      if (bet.prediction === bet.outcome) {
        User.findOneAndUpdate(
          { _id: bet.user },
          { $inc: { balance: bet.potentialWinnings } },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("userBalancePay:", err);
            }
            console.log(doc);
          },
        );
        Bet.findOneAndUpdate(
          { _id: bet._id },
          { paid: "paid" },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("betPayStatus:", err);
            }
          },
        );
      } else {
        Bet.findOneAndUpdate(
          { _id: bet._id },
          { paid: "lost" },
          { new: true },
          (err, doc) => {
            if (err) {
              console.log("betPayStatus:", err);
            }
          },
        );
      }
    });
  });
};

export default payWinners;
