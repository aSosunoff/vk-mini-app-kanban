import React, { createContext, useContext } from "react";
import { useActivePanel } from "../hooks/useActivePanel";
import { useColumnsState } from "../hooks/useColumnsState";
import { useDesksState } from "../features/desks/hooks/useDesksState";

interface IAppStateContext
  extends ReturnType<typeof useDesksState>,
    ReturnType<typeof useColumnsState>,
    ReturnType<typeof useActivePanel> {}

const AppStateContext = createContext<IAppStateContext>({} as IAppStateContext);

AppStateContext.displayName = "AppStateContext";

export const useAppStateContext = () => useContext(AppStateContext);

export const AppStateProvider: React.FC = ({ children }) => {
  const deskState = useDesksState();

  const columnsState = useColumnsState();

  const { goToColumn, goToDesk } = useActivePanel();

  return (
    <AppStateContext.Provider
      value={{
        ...deskState,
        ...columnsState,
        goToColumn,
        goToDesk,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
