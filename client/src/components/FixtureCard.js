import React, { useContext } from "react";
import { Typography, makeStyles, CardActions, Button } from "@material-ui/core";

import { AuthContext } from "../contexts/authContext";
import PlaceBetModal from "./PlaceBetModal";
import BaseCard from "./subcomponents/BaseCard";

const useStyles = makeStyles((theme) => ({
  actions: {
    "& *": {
      margin: "auto",
      paddingBottom: "20px",
    },
  },
}));

const FixtureCard = ({ fixture }) => {
  const { user } = useContext(AuthContext);

  const classes = useStyles();

  return (
    <>
      <BaseCard fixture={fixture}>
        <Typography variant="overline" component="h2">
          {fixture.homeTeam.team_name} v {fixture.awayTeam.team_name}
        </Typography>
        <Typography variant="subtitle1" component="h3">
          {String(new Date(fixture.event_date)).substring(0, 10)}{" "}
          {String(new Date(fixture.event_date)).substring(15, 21)}
        </Typography>
        <CardActions className={classes.actions}>
          {user ? (
            <>
              {" "}
              <PlaceBetModal
                fixture={fixture}
                prediction="home"
                trigger={(props) => (
                  <Button size="small" color="primary" {...props}>
                    {(fixture.odds.home - 1).toFixed(1)}/1 <br /> Home Bet
                  </Button>
                )}
              />
              <PlaceBetModal
                fixture={fixture}
                prediction="draw"
                trigger={(props) => (
                  <Button size="small" color="primary" {...props}>
                    {(fixture.odds.draw - 1).toFixed(1)}/1 <br /> Draw Bet
                  </Button>
                )}
              />
              <PlaceBetModal
                fixture={fixture}
                prediction="away"
                trigger={(props) => (
                  <Button size="small" color="primary" {...props}>
                    {(fixture.odds.away - 1).toFixed(1)}/1 <br /> Away Bet
                  </Button>
                )}
              />
            </>
          ) : (
            <Button size="small" color="primary" href="/login">
              YOU NEED TO LOGIN OR REGISTER
            </Button>
          )}
        </CardActions>
      </BaseCard>
    </>
  );
};
export default FixtureCard;
