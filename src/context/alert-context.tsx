import { ViewProps } from "@vkontakte/vkui/dist/components/View/View";
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

interface IAlertContext extends Pick<ViewProps, "popout"> {
  setPopoutHandler: (popout: React.ReactNode) => void;
}

const AlertContext = createContext<IAlertContext>({ setPopoutHandler: () => undefined });

AlertContext.displayName = "AlertContext";

export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider: React.FC = ({ children }) => {
  const [popout, setPopout] = useState();

  const setPopoutHandler = useCallback((popout) => {
    setPopout(() => popout);
  }, []);

  return (
    <AlertContext.Provider
      value={{
        popout,
        setPopoutHandler,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
