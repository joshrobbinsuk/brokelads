import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";

import betToString from "../utilityFunctions/mapBetsToStrings";
import { AppContext } from "../contexts/context";
import useActionRunner from "../hooks/ActionRunner";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 450,
    textAlign: "center",
    padding: "20px",
  },
  content: {
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    "& *": {
      margin: "auto",
      paddingBottom: "20px",
    },
  },
  betDetails: {
    paddingBottom: "10px",
  },
  betStake: {
    color: theme.palette.primary.dark,
    paddingBottom: "10px",
  },
}));

const BetConfirmationModal = () => {
  const classes = useStyles();

  //  modal stuff
  const [modalOpen, setModalOpen] = useState(false);
  const handleShowModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const { activeBet, unStageActiveBet } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(activeBet).length === 0) {
      return;
    }
    handleShowModal();
  }, [activeBet]);

  // data stuff
  const { bet, fixture } = activeBet;
  const { postBets } = useContext(AppContext);
  const [postData, isPosting] = useActionRunner(
    postBets,
    "Bet posted - good luck!",
  );
  const handleSubmit = async () => {
    await postData(bet);
    unStageActiveBet();
    handleCloseModal();
  };

  return !bet ? null : (
    <>
      <Dialog
        className={classes.root}
        open={modalOpen}
        onClose={() => {
          unStageActiveBet();
          handleCloseModal();
        }}
      >
        <DialogTitle> Are you sure? </DialogTitle>
        <DialogContent className={classes.content}>
          <Typography
            className={classes.betDetails}
            variant="subtitle1"
            component="h3"
          >
            {betToString(bet.prediction)}: {fixture.homeTeam.team_name} v{" "}
            {fixture.awayTeam.team_name}
          </Typography>
          <Typography className={classes.betStake} variant="h6" component="h3">
            £{bet.stake}
          </Typography>
          <Typography variant="overline" component="h3">
            Bets can't be edited or deleted
          </Typography>
        </DialogContent>
        <DialogActions classes={classes.actions}>
          <Button onClick={handleSubmit} color="primary">
            Place Bet
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BetConfirmationModal;
