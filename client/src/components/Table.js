import React, { useContext, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { makeStyles } from "@material-ui/core";

import toMoneyString from "../utilityFunctions/balanceToMoneyString";
import { AppContext } from "../contexts/context";
import useActionRunner from "../hooks/ActionRunner";
import AltText from "./subcomponents/AltText";

const useStyles = makeStyles({});

const Table = () => {
  const classes = useStyles();

  const { users, fetchUsers } = useContext(AppContext);
  const [fetchData, isFetching, error] = useActionRunner(fetchUsers);

  useEffect(() => {
    fetchData();
  }, []);

  const userData = isFetching
    ? []
    : users.map(({ username, balance }) => ({
        user: username,
        balance: balance,
        displayBalance: toMoneyString(balance),
      }));

  const columns = [
    { name: "user", label: "User", options: { filter: false, sort: false } },
    {
      name: "balance",
      label: "none",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "displayBalance",
      label: "Balance",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  //  datatable options
  const options = {
    download: false,
    elevation: 0,
    // pagination: false,
    print: false,
    responsive: "standard",
    rowsPerPage: 20,
    rowsPerPageOptions: [20, 50, 100],
    rowHover: false,
    selectableRows: "none",
    viewColumns: false,
    filter: false,
    sortOrder: {
      name: "balance",
      direction: "desc",
    },
  };

  return isFetching ? (
    <AltText content="Just fetching user data..." />
  ) : error ? (
    <AltText content="We had a problem loading users..." />
  ) : (
    <div className={classes.root}>
      <MUIDataTable
        title={"BROKELADS LEADERBOARD"}
        data={userData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default Table;
