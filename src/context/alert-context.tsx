import { Alert } from "@vkontakte/vkui";
import { AlertProps } from "@vkontakte/vkui/dist/components/Alert/Alert";
import { ViewProps } from "@vkontakte/vkui/dist/components/View/View";
import React, { createContext, useCallback, useContext, useState } from "react";

interface IAlertContext extends Pick<ViewProps, "popout"> {
  setPopoutHandler: (popout: AlertProps) => void;
  clearPopoutHandler: () => void;
}

const AlertContext = createContext<IAlertContext>({} as IAlertContext);

AlertContext.displayName = "AlertContext";

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider: React.FC = ({ children }) => {
  const [popout, setPopout] = useState<React.ReactNode>();

  const setPopoutHandler = useCallback((popout: AlertProps) => {
    setPopout(() => <Alert {...popout} />);
  }, []);

  const clearPopoutHandler = useCallback(() => setPopout(() => null), []);

  return (
    <AlertContext.Provider
      value={{
        popout,
        setPopoutHandler,
        clearPopoutHandler,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
