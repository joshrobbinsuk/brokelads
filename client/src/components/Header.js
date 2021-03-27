// https://ansonlowzf.com/how-to-build-a-material-ui-navbar/
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SideDrawer from "./SideDrawer";

import toMoneyString from "../utilityFunctions/balanceToMoneyString";
import { AuthContext } from "../contexts/authContext";
import useActionRunner from "../hooks/ActionRunner";
import { AppContext } from "../contexts/context";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
  },
  pageTitle: {
    marginTop: "15px",
    color: "white",
    fontStyle: "italic",
    fontWeight: "600",
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  secondHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  userInfoOuterContainer: {
    display: "flex",
    justifyContent: "center",
  },
  userInfoInnerContainer: {
    width: "340px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    fontFamily: "Roboto",
    "&:first-child": {
      paddingLeft: "4px",
    },
    "&:last-child": {
      paddingRight: "4px",
    },
  },
  loginContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

const navLinks = [
  { title: `Fixtures`, path: `/fixtures` },
  { title: `My Bets`, path: `/mybets` },
  { title: `Leaderboard`, path: `/leaderboard` },
];

const Header = () => {
  const classes = useStyles();

  const { user, getUser } = useContext(AuthContext);
  const [doGetUser, isFetching] = useActionRunner(getUser);
  const { activeBet } = useContext(AppContext);

  useEffect(() => {
    doGetUser();
  }, [activeBet]);

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
          <Typography className={classes.pageTitle} variant="h5" component="h1">
            Brokelads
          </Typography>
          <Hidden xsDown>
            <List component="nav" className={classes.navDisplayFlex}>
              {navLinks.map(({ title, path }) => (
                <a href={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </a>
              ))}
            </List>
          </Hidden>
          <Hidden smUp>
            <SideDrawer navLinks={navLinks} />
          </Hidden>
        </Container>
      </Toolbar>
      <div className={classes.secondHeader}>
        {isFetching ? null : user && user.username ? (
          <div className={classes.userInfoOuterContainer}>
            <div className={classes.userInfoInnerContainer}>
              <div>
                <Typography variant="overline" component="h2">
                  {user.username}
                </Typography>
              </div>
              <div>
                <Typography variant="overline" component="h2">
                  {user.username && toMoneyString(user.balance)}
                </Typography>
              </div>
              <div>
                <Link className={classes.linkText} to="/logout">
                  <Typography variant="overline" component="h2">
                    Logout
                  </Typography>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.loginContainer}>
            <Typography variant="overline" component="h2">
              <Link to="/login" className={classes.linkText}>
                Login / Register
              </Link>
            </Typography>
          </div>
        )}
      </div>
    </AppBar>
  );
};

export default Header;
