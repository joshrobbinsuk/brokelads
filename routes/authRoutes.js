import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../schemas/userSchema";

const authRoutes = (app) => {
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send(info);
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({ success: "logged in", user: req.user });
          console.log(req.user);
        });
      }
    })(req, res, next);
  });

  app.post("/api/register", (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send({ username: "User Already Exists" });
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          balance: 100,
        });
        await newUser.save();
        res.send({ success: "User Created" });
      }
    });
  });
  app.get("/api/user", (req, res) => {
    if (req.user === undefined) {
      res.send({ noUser: "didn't match anything" });
    } else {
      res.send(req.user);
    } // The req.user stores the entire user that has been authenticated inside of it.
  });

  app.get("/api/logout", (req, res) => {
    req.logOut();
    req.session.destroy();
    res.send("logged out");
    // https://www.npmjs.com/package/express-session
  });

  app.get("/api/allusers", (req, res) => {
    User.find().exec((err, users) => {
      if (err) return res.status(500).send(err);

      const tableData = users.map((u) => {
        return { username: u.username, balance: u.balance };
      });
      return res.json(tableData);
    });
  });
};

export default authRoutes;
