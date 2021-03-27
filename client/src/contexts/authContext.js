import React, { createContext, useState } from "react";
import Axios from "axios";

export const AuthContext = createContext({
  user: null,
  registerUser: () => {},
  loginUser: () => {},
  getUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider = (props) => {
  const LOGIN_ENDPOINT = "api/login";
  const LOGOUT_ENDPOINT = "api/logout";
  const REG_ENDPOINT = "api/register";
  const GET_ENDPOINT = "api/user";

  const [user, setUser] = useState({});

  const registerUser = async (args) => {
    try {
      const res = await fetch(REG_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      if (data.success) {
        return data;
      } else {
        return { error: data };
      }
    } catch (err) {
      return { error: err };
    }
  };

  const loginUser = async (args) => {
    try {
      const res = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(args),
      });
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        return { success: "user logged in" };
      } else {
        return { error: data };
      }
    } catch (err) {
      return { error: err };
    }
  };

  const getUser = async () => {
    try {
      const res = await fetch(GET_ENDPOINT);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      if (data.noUser) {
        setUser(null);
      } else {
        setUser(data);
      }
      return { success: "user retreived from server", user: data };
    } catch (err) {
      return { error: err };
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fetch(LOGOUT_ENDPOINT);
      if (!res.ok) {
        throw res;
      }
      setUser(null);
      return { success: "user logged out" };
    } catch (err) {
      return { error: err };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        getUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
