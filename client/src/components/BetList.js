import { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { AppContext } from "../contexts/context";
import { AuthContext } from "../contexts/authContext";
import useActionRunner from "../hooks/ActionRunner";
import BetCard from "./BetCard";
import AltText from "./subcomponents/AltText";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4px",
  },
}));

const BetList = (props) => {
  const classes = useStyles();

  const { bets, fetchBets } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [fetchData, isFetching, error] = useActionRunner(fetchBets);

  useEffect(() => {
    if (!user.username) {
      return;
    }
    fetchData(user);
  }, [user]);

  const betsToShow = bets.filter((bet) => {
    if (bet.status === "unsettled") {
      return props.state.undecided;
    } else if (bet.prediction === bet.outcome) {
      return props.state.won;
    } else {
      return props.state.lost;
    }
  });

  return isFetching ? null : error ? (
    <AltText content="We had a problem loading your bets" />
  ) : betsToShow.length ? (
    <div className={classes.root}>
      {betsToShow.map((bet) => (
        <BetCard bet={bet} key={bet._id} />
      ))}
    </div>
  ) : bets.length ? null : (
    <AltText content="Looks like you haven't made any bets yet" />
  );
};

export default BetList;
