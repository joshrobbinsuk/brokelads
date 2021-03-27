import dotenv from "dotenv";
import path from "path";
dotenv.config();

const { NODE_ENV } = process.env;

const clientRoutes = (app) => {
  app.get("*", (req, res) => {
    if (NODE_ENV === "production") {
      res.sendFile(
        path.join(__dirname, "../client/", "build/index.html"),
        (err) => {
          if (err) {
            console.log("sendFile Err", err);
          }
        },
      );
    }
  });

  app.all("*", (req, res) => {
    res.sendStatus(404);
  });
};

export default clientRoutes;
