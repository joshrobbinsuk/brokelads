import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useContext, useState } from "react";

import { AppContext } from "../contexts/context";
import { AuthContext } from "../contexts/authContext";
import PlaceBetFormContent from "./PlaceBetFormContent";

const useStyles = makeStyles({
  root: {
    // maxWidth: 500,
    textAlign: "center",
  },
  content: {
    textAlign: "left",
  },
  actions: {
    display: "flex",
    "& *": {
      margin: "auto",
      paddingBottom: "20px",
    },
  },
  winningsField: {
    marginTop: "50px",
  },
});

const PlaceBetModal = ({ fixture, trigger, prediction }) => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const handleShowModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const validationSchema = yup.object().shape({
    fixture: yup.string().required(),
    prediction: yup.string().required(),
    stake: yup.number().required().positive().max(user.balance),
    status: yup.string().required(),
  });

  const initialValues = {
    stake: 0,
    potentialWinnings: 0,
    fixture: fixture._id,
    prediction: prediction,
    status: "unsettled",
    user: user._id,
  };

  const { stageActiveBet } = useContext(AppContext);
  const handleSubmit = async (values) => {
    await stageActiveBet({ bet: values, fixture: fixture });
    handleCloseModal();
  };

  return (
    <>
      {trigger({ onClick: handleShowModal })}
      <Dialog
        className={classes.root}
        open={modalOpen}
        onClose={handleCloseModal}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <DialogContent>
                <Typography variant="subtitle1" component="h2"></Typography>
                <PlaceBetFormContent
                  user={user}
                  fixture={fixture}
                  prediction={prediction}
                />
              </DialogContent>
              <DialogActions className={classes.actions}>
                <Button onClick={handleSubmit} color="primary">
                  Place Bet
                </Button>
                <Button onClick={handleCloseModal} color="secondary">
                  Go back
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default PlaceBetModal;
