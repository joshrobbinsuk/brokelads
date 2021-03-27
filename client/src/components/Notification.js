import React, { useContext, useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/";
import { Alert } from "@material-ui/lab";

import { NotificationContext } from "../contexts/notificationContext";

const useStyles = makeStyles({
  success: {
    backgroundColor: "green",
    height: "500px",
  },
  error: {
    backgroundColor: "red",
  },
});

const Notification = () => {
  const { notification, removeNotification } = useContext(NotificationContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!notification) {
      return;
    }
    setOpen(true);
  }, [notification]);

  const handleClose = (event, reason) => {
    setOpen(false);
    removeNotification();
  };

  return !notification ? null : (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={notification && notification.variant}
        >
          {notification && notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;
