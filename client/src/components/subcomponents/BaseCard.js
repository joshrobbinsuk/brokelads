import React from "react";
import { makeStyles, Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginBottom: "4px",
    [theme.breakpoints.up("sm")]: {
      minWidth: "380px",
    },
  },
  logoMaster: {
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: "20px",
    "& *": {
      maxHeight: "60px",
    },
  },
}));

const BaseCard = ({ fixture, children }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.logoMaster}>
          <div>
            <img
              src={fixture.homeTeam.logo}
              alt={`{$fixture.homeTeam.team_name}`}
            ></img>
          </div>
          <div className={classes.logoAway}>
            <img
              src={fixture.awayTeam.logo}
              alt={`{$fixture.awayTeam.team_name}`}
            ></img>
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default BaseCard;
