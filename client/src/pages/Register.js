import React, { useContext } from "react";
import AuthForm from "../components/subcomponents/AuthForm";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { AuthContext } from "../contexts/authContext";
import useActionRunner from "../hooks/ActionRunner";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const { registerUser } = useContext(AuthContext);
  let history = useHistory();
  let from = "/login";

  const [doRegister] = useActionRunner(
    registerUser,
    "Successfully registered - now log in!",
  );

  return (
    <div className={classes.root}>
      <AuthForm
        title="Register"
        handleSubmit={async (values, { setErrors }) => {
          const registerResult = await doRegister(values);
          if (registerResult.error) {
            setErrors(registerResult.error);
          } else if (registerResult.success) {
            history.replace(from);
          }
        }}
      />
    </div>
  );
};

export default Login;
