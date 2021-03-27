import React, { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext({
  notification: null,
  addNotification: () => {},
  removeNotification: () => {},
});

export const NotificationProvider = (props) => {
  const [notification, setNotification] = useState(null);
  const removeNotification = () => setNotification(null);
  const addNotification = ({ variant, message }) =>
    setNotification({ variant, message });

  return (
    <NotificationContext.Provider
      value={{
        notification,
        addNotification: useCallback(
          ({ message, variant }) => addNotification({ message, variant }),
          [],
        ),
        removeNotification: useCallback(() => removeNotification(), []),
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
