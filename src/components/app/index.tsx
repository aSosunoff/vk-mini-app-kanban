import React, { useCallback, useState } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../panels/desks";
import { Columns } from "../panels/columns";
import { useAlertContext } from "../../context/alert-context";
import { IDesks } from "../../Interfaces/IDesks";

export const App = () => {
  const [activePanel, setActivePanel] = useState<"desks" | "columns">("desks");
  const [activeDesk, setActiveDesk] = useState<IDesks>();

  const { popout } = useAlertContext();

  const [descs, setDesks] = useState<IDesks[]>([]);
  const setDesksHandler = useCallback((desks: IDesks[]) => setDesks(() => desks), []);
  const addDeskHandler = useCallback((desk: IDesks) => setDesks((prev) => [...prev, desk]), []);
  const deleteDeskHandler = useCallback(
    (deskIdRemoved) => setDesks((prev) => prev.filter(({ id }) => id !== deskIdRemoved)),
    []
  );

  return (
    <View activePanel={activePanel} popout={popout}>
      <Desks
        id="desks"
        onChangePanel={(desk) => {
          setActivePanel(() => "columns");
          setActiveDesk(() => desk);
        }}
        desks={descs}
        onAddDesk={addDeskHandler}
        onDeleteDesk={deleteDeskHandler}
        onSetDesks={setDesksHandler}
      />

      <Columns id="columns" onChangePanel={() => setActivePanel("desks")} activeDesk={activeDesk} />
    </View>
  );
};
