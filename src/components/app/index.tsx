import React, { useCallback, useEffect, useState } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../panels/desks";
import { Columns } from "../panels/columns";
import { useAlertContext } from "../../context/alert-context";
import { IDesks } from "../../Interfaces/IDesks";
import { getDesks } from "../actions";

export const App = () => {
  const [activePanel, setActivePanel] = useState<"desks" | "columns">("desks");
  const [activeDesk, setActiveDesk] = useState<IDesks>();

  const { popout } = useAlertContext();

  /* Desk */
  const [descs, setDesks] = useState<IDesks[]>([]);
  const addDeskHandler = useCallback((desk: IDesks) => setDesks((prev) => [...prev, desk]), []);
  const deleteDeskHandler = useCallback(
    (deskIdRemoved) => setDesks((prev) => prev.filter(({ id }) => id !== deskIdRemoved)),
    []
  );
  useEffect(() => {
    getDesks()
      .then((desks) => setDesks(() => desks))
      .catch(console.error);
  }, []);
  /* Desk */

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
      />

      <Columns id="columns" onChangePanel={() => setActivePanel("desks")} activeDesk={activeDesk} />
    </View>
  );
};
