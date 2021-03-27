import dotenv from "dotenv";
dotenv.config();
import Bet from "../schemas/betSchema";
import User from "../schemas/userSchema";

// * BET ENDPOINTS

const betRoutes = (app) => {
  app.get("/api/bets/:user?", (req, res) => {
    const filters = {};
    const { user } = req.params;

    Bet.find({ user: user })
      .populate("fixture")
      .exec(function (err, bets) {
        if (err) return res.status(500).send(err);
        return res.json(bets);
      });
  });

  app.post("/api/bets", (req, res) => {
    const newBet = new Bet(req.body);
    newBet.save((err, model) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send(newBet);
    });

    const negStake = 0 - req.body.stake;
    User.findOneAndUpdate(
      { _id: req.body.user },
      { $inc: { balance: negStake } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("userBalanceDec:", err);
        }
        console.log(doc);
      },
    );
  });

  app.delete("/api/bets/:id", (req, res) => {
    const { id } = req.params;
    Bet.remove({ _id: id }, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.sendStatus(204);
    });
  });
};

export default betRoutes;
