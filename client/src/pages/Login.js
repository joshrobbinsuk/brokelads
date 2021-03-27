import React, { useContext } from "react";
import AuthForm from "../components/subcomponents/AuthForm";
import { useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { AuthContext } from "../contexts/authContext";
import useActionRunner from "../hooks/ActionRunner";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // maxWidth: "600px",
    alignItems: "center",
  },

  linkText: {
    textDecoration: "none",
    textTransform: `uppercase`,
    color: `black`,
    margin: "20px 0px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const { loginUser } = useContext(AuthContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [doLogin] = useActionRunner(loginUser, "Successfully logged in!");

  return (
    <div className={classes.root}>
      <Link className={classes.linkText} to="/register">
        Click here to register
      </Link>
      <AuthForm
        title="Or login here"
        handleSubmit={async (values, { setErrors }) => {
          const loginResult = await doLogin(values);
          if (loginResult.error) {
            setErrors(loginResult.error);
          } else if (loginResult.success) {
            history.replace(from);
          }
        }}
      />
    </div>
  );
};

export default Login;
