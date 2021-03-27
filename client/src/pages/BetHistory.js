import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import BetList from "../components/BetList";
import BetFilters from "../components/BetFilters";

const useStyles = makeStyles(() => ({
  innerListContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const BetHistory = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    undecided: true,
    won: true,
    lost: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.outerListContainer}>
      <div className={classes.innerListContainer}>
        <BetFilters state={state} handleChange={handleChange} />
        <BetList state={state} />
      </div>
    </div>
  );
};

export default BetHistory;
