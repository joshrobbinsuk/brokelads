import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";
import useActionRunner from "../hooks/ActionRunner";

const PrivateRoute = (props) => {
  const { user, getUser } = useContext(AuthContext);

  const [doGetUser, isGetting] = useActionRunner(getUser);

  useEffect(() => {
    doGetUser();
  }, []);

  return isGetting ? null : (
    <Route
      path={props.path}
      render={(data) =>
        user ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: data.location } }}
          ></Redirect>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
