import React from "react";
import { makeStyles } from "@material-ui/core";

import FixtureList from "../components/FixtureList";
import BetConfirmationModal from "../components/BetConfirmationModal";

const useStyles = makeStyles(() => ({
  outerListContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const Fixtures = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.outerListContainer}>
        <div className={classes.innerListContainer}>
          <FixtureList />
        </div>
      </div>
      <BetConfirmationModal />
    </>
  );
};

export default Fixtures;
