import React, { useState } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../desks";
import { Columns } from "../columns";
import { useAlertContext } from "../../context/alert-context";

export const App = () => {
  const [activePanel, setActivePanel] = useState<"desks" | "columns">("columns");
  const { popout } = useAlertContext();

  return (
    <View activePanel={activePanel} popout={popout}>
      <Desks id="desks" /* onChangePanel={() => setActivePanel(panel.columns)} */ />
      <Columns id="columns" onChangePanel={() => setActivePanel("desks")} />
    </View>
  );
};
