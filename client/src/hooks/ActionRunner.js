import { useState, useContext } from "react";

import { NotificationContext } from "../contexts/notificationContext";

const useActionRunner = (
  action,
  successMessage = null,
  errorMessage = "Ooops! There was a problem doing that...",
) => {
  const { addNotification } = useContext(NotificationContext);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState(false);

  const runActions = async (...args) => {
    setRunning(true);
    const result = await action(...args);
    if (result.error) {
      setError(true);
      addNotification({ variant: "error", message: errorMessage });
    } else {
      if (successMessage) {
        addNotification({ variant: "success", message: successMessage });
      }
    }
    setRunning(false);
    return result;
  };

  return [runActions, running, error];
};

export default useActionRunner;
