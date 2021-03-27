import { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import { AppContext } from "../contexts/context";
import useActionRunner from "../hooks/ActionRunner";
import FixtureCard from "./FixtureCard";
import AltText from "./subcomponents/AltText";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4px",
  },
}));

const FixtureList = () => {
  const classes = useStyles();

  const { fixtures, fetchFixtures } = useContext(AppContext);

  const [fetchData, isFetching, error] = useActionRunner(fetchFixtures);

  useEffect(() => {
    fetchData();
  }, []);

  return isFetching ? null : error ? (
    <AltText content="We had a problem loading fixtures" />
  ) : (
    <div className={classes.root}>
      {fixtures.map((fixture) => (
        <FixtureCard fixture={fixture} key={fixture._id} />
      ))}
    </div>
  );
};

export default FixtureList;
