import React, { createContext, useCallback, useContext, useState } from "react";

interface ISnackbarContext {
  snackbar?: React.ReactNode;
  setSnackbarHandler: (snackbar: React.ReactNode) => void;
}

const SnackbarContext = createContext<ISnackbarContext>({ setSnackbarHandler: () => undefined });

SnackbarContext.displayName = "SnackbarContext";

export const useSnackbarContext = () => useContext(SnackbarContext);

export const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbar, setSnackbar] = useState();

  const setSnackbarHandler = useCallback((snackbar) => {
    setSnackbar(() => snackbar);
  }, []);

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        setSnackbarHandler,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
