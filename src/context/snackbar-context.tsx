import { Snackbar } from "@vkontakte/vkui";
import { SnackbarProps } from "@vkontakte/vkui/dist/components/Snackbar/Snackbar";
import React, { createContext, useCallback, useContext, useState } from "react";

interface ISnackbarContext {
  snackbar?: React.ReactNode;
  setSnackbarHandler: (props: SnackbarProps) => void;
  clearSnackbarHandler: () => void;
}

const SnackbarContext = createContext<ISnackbarContext>({} as ISnackbarContext);

SnackbarContext.displayName = "SnackbarContext";

export const useSnackbarContext = () => useContext(SnackbarContext);

export const SnackbarProvider: React.FC = ({ children }) => {
  const [snackbar, setSnackbar] = useState<React.ReactNode>();

  const setSnackbarHandler = useCallback((props: SnackbarProps) => {
    setSnackbar(() => <Snackbar {...props} />);
  }, []);

  const clearSnackbarHandler = useCallback(() => setSnackbar(() => null), []);

  return (
    <SnackbarContext.Provider
      value={{
        snackbar,
        setSnackbarHandler,
        clearSnackbarHandler,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};
