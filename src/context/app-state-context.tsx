import React, { createContext, useCallback, useContext, useState } from "react";
import { useColumnsState } from "../hooks/useColumnsState";
import { useDesksState } from "../hooks/useDesksState";
import { IDesks } from "../Interfaces/IDesks";

interface IAppStateContext
  extends ReturnType<typeof useDesksState>,
    ReturnType<typeof useColumnsState> {
  activeDesk?: IDesks;
  setActiveDeskHandler: (desk: IDesks) => void;
}

const AppStateContext = createContext<IAppStateContext>({} as IAppStateContext);

AppStateContext.displayName = "AppStateContext";

export const useAppStateContext = () => useContext(AppStateContext);

export const AppStateProvider: React.FC = ({ children }) => {
  const [activeDesk, setActiveDesk] = useState<IDesks>();

  const setActiveDeskHandler = useCallback((desk: IDesks) => setActiveDesk(() => desk), []);

  const { desks, createDeskHandler, deleteDeskHandler } = useDesksState();

  const { columns, createColumnHandler, deleteColumnHandler } = useColumnsState(activeDesk);

  return (
    <AppStateContext.Provider
      value={{
        desks,
        createDeskHandler,
        deleteDeskHandler,
        columns,
        createColumnHandler,
        deleteColumnHandler,
        activeDesk,
        setActiveDeskHandler,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
