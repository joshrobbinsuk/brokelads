import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  won: {
    color: "green",
  },
  lost: {
    color: "purple",
  },
  undecided: {
    color: "orange",
  },
}));

const BetFilters = (props) => {
  const classes = useStyles();

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            color="default"
            className={classes.won}
            checked={props.state.won}
            onChange={props.handleChange}
            name="won"
          />
        }
        label="Won"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="default"
            className={classes.lost}
            checked={props.state.lost}
            onChange={props.handleChange}
            name="lost"
          />
        }
        label="Lost"
      />
      <FormControlLabel
        control={
          <Checkbox
            color="default"
            className={classes.undecided}
            checked={props.state.undecided}
            onChange={props.handleChange}
            name="undecided"
          />
        }
        label="Not settled"
      />
    </FormGroup>
  );
};

export default BetFilters;
