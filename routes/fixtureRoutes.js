import Fixture from "../schemas/fixtureSchema";

// * FIXTURE ENDPOINTS
const fixtureRoutes = (app) => {
  app.get("/api/fixtures/", (req, res) => {
    const now = Number(String(Date.now()).substring(0, 10));
    Fixture.find({
      event_timestamp: { $gt: now },
      odds: { $exists: true },
    }).exec(function (err, fixtures) {
      if (err) return res.status(500).send(err);
      // return res.json(fixtures);
      return res.json(
        fixtures.sort((a, b) => {
          return a.event_timestamp > b.event_timestamp ? 1 : -1;
        }),
      );
    });
  });
};

export default fixtureRoutes;
