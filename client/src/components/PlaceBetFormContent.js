import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";

import FormikMoneyField from "./subcomponents/FormikMoneyField";

const useStyles = makeStyles({
  winningsField: {
    marginTop: "20px",
  },
});

const PlaceBetFormContent = ({ user, fixture, prediction, ...props }) => {
  const classes = useStyles();

  const {
    values: { stake },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    setFieldValue(
      "potentialWinnings",
      (stake * fixture.odds[prediction]).toFixed(2),
    );
  }, [stake]);
  return (
    <>
      <FormikMoneyField
        user={user}
        name="stake"
        label="Enter your stake here"
      />
      <FormikMoneyField
        className={classes.winningsField}
        fixture={fixture}
        prediction={prediction}
        name="potentialWinnings"
        label={`Returns: stake * ${fixture.odds[prediction]}`}
      />
    </>
  );
};

export default PlaceBetFormContent;
