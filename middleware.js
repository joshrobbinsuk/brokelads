import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import memorystore from "memorystore";
import passportStrategy from "./auth/passportConfig";
import path from "path";

const MemoryStore = memorystore(session);
const { NODE_ENV } = process.env;
// * MIDDLEWARE
// parse application/x-www-form-urlencoded
const middleware = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json()); // parse application/json
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      resave: false,
    }),
  );
  app.use(cookieParser("secret"));
  app.use(passport.initialize());
  app.use(passport.session());
  passportStrategy(passport);
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/build")));
  }
};

export default middleware;
