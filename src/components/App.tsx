import React, { useState } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "./Desks";
import { Columns } from "./Columns";
import { useAlertContext } from "../context/alert-context";

const panel = {
  desks: "desks",
  columns: "columns",
};

export const App = () => {
  const [activePanel, setActivePanel] = useState(panel.desks);
  const { popout } = useAlertContext();

  return (
    <View activePanel={activePanel} popout={popout}>
      <Desks id={panel.desks} onChangePanel={() => setActivePanel(panel.columns)} />
      <Columns id={panel.columns} onChangePanel={() => setActivePanel(panel.desks)} />
    </View>
  );
};
