import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px 5px",
  },
}));

const AltText = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2">
        {content}
      </Typography>
    </div>
  );
};

export default AltText;
