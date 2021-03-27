import React, { createContext, useState } from "react";

export const AppContext = createContext({
  fetchFixtures: () => {},
  fixtures: [],
  fetchBets: () => {},
  postBets: () => {},
  bets: [],
  stageActiveBet: () => {},
  unStageActiveBet: () => {},
  activeBet: {},
  users: [],
  fetchUsers: () => {},
});

export const AppProvider = (props) => {
  // get fixtures
  const [fixtures, setFixtures] = useState([]);
  const FIXTURES_ENDPOINT = "api/fixtures/";
  const fetchFixtures = async () => {
    try {
      const res = await fetch(FIXTURES_ENDPOINT);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      setFixtures(data);
      return { success: "post Bets success" };
    } catch (err) {
      return { error: err };
    }
  };

  // post bet to confirmation dialog
  const [activeBet, setActiveBet] = useState({});
  const stageActiveBet = (values) => {
    setActiveBet(values);
  };
  const unStageActiveBet = (values) => {
    setActiveBet({});
  };
  // post bets
  const BETS_ENDPOINT = "api/bets/";
  const postBets = async (args) => {
    try {
      const res = await fetch(BETS_ENDPOINT, {
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

      return { success: "fetch Fixtures success" };
    } catch (err) {
      return { error: err };
    }
  };

  //  get bets
  const [bets, setBets] = useState([]);

  const fetchBets = async (user) => {
    try {
      const res = await fetch(BETS_ENDPOINT + user._id);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      setBets(data);
      return { success: "fetch Bets success" };
    } catch (err) {
      return { error: err };
    }
  };

  //  get users for Leaderboard
  const [users, setUsers] = useState([]);
  const USERS_ENDPOINT = "api/allusers/";
  const fetchUsers = async () => {
    try {
      const res = await fetch(USERS_ENDPOINT);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      setUsers(data);
      return { success: "fetch Users success" };
    } catch (err) {
      return { error: err };
    }
  };

  return (
    <AppContext.Provider
      value={{
        fetchFixtures,
        fixtures,
        fetchBets,
        postBets,
        bets,
        stageActiveBet,
        unStageActiveBet,
        activeBet,
        users,
        fetchUsers,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
