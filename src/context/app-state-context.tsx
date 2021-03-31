import React, { createContext, useContext } from "react";
import { useDesksState } from "../hooks/useDesksState";

interface IAppStateContext extends ReturnType<typeof useDesksState> {}

const AppStateContext = createContext<IAppStateContext>({} as IAppStateContext);

AppStateContext.displayName = "AppStateContext";

export const useAppStateContext = () => useContext(AppStateContext);

export const AppStateProvider: React.FC = ({ children }) => {
  const { desks, createDeskHandler, deleteDeskHandler } = useDesksState();

  return (
    <AppStateContext.Provider value={{ desks, createDeskHandler, deleteDeskHandler }}>
      {children}
    </AppStateContext.Provider>
  );
};
