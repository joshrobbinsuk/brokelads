import User from "../schemas/userSchema";
import bcrypt from "bcryptjs";
import { Strategy as localStrategy } from "passport-local";

const passportStrategy = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { username: "Incorrect username." });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false, { password: "Incorrect password." });
          }
        });
      });
    }),
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
        balance: user.balance,
        _id: user._id,
      };
      cb(err, userInformation);
    });
  });
};

export default passportStrategy;
