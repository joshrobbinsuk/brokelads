import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { AuthContext } from "../contexts/authContext";
import useActionRunner from "../hooks/ActionRunner";
import AltText from "../components/subcomponents/AltText";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
}));

const Logout = () => {
  const classes = useStyles();
  const { logoutUser } = useContext(AuthContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [doLogout] = useActionRunner(logoutUser, "Successfully logged out!");

  return (
    <div className={classes.root}>
      <AltText content="Make sure to come back soon!" />
      <Button
        onClick={() => {
          doLogout();
          history.replace(from);
        }}
        color="primary"
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
