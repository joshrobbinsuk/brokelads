import { useField } from "formik";
import { FormHelperText, FormControl } from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  helpText: {
    color: "orange",
  },
});

export const FormikMoneyField = ({ ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const { error, touched } = meta;
  const helperText = touched && error ? error : null;
  return (
    <FormControl fullWidth>
      <CurrencyTextField
        variant="standard"
        currencySymbol="£"
        minimumValue="0"
        outputFormat="number"
        decimalCharacter="."
        digitGroupSeparator=""
        {...field}
        {...props}
      />
      <FormHelperText className={classes.helpText}>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default FormikMoneyField;
