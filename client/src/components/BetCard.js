import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import toMoneyString from "../utilityFunctions/balanceToMoneyString";
import betToString from "../utilityFunctions/mapBetsToStrings";
import BaseCard from "./subcomponents/BaseCard";

const useStyles = makeStyles((theme) => ({}));

const BetCard = ({ bet }) => {
  const classes = useStyles();
  return (
    <BaseCard fixture={bet.fixture}>
      <Typography variant="overline" component="h2">
        {bet.fixture.homeTeam.team_name} v {bet.fixture.awayTeam.team_name}
      </Typography>
      <Typography variant="h6" component="h3" color="primary">
        {toMoneyString(bet.stake)} bet
      </Typography>
      <Typography variant="subtitle1" component="h3">
        {String(new Date(bet.fixture.event_date)).substring(0, 10)}{" "}
        {String(new Date(bet.fixture.event_date)).substring(15, 21)}
      </Typography>
      <Typography variant="h6" component="h3" color="primary">
        Prediction: {betToString(bet.prediction)}
      </Typography>
      <Typography variant="subtitle2" component="h2">
        Returns: {toMoneyString(bet.potentialWinnings)}
      </Typography>
    </BaseCard>
  );
};

export default BetCard;
