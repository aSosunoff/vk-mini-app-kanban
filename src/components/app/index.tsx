import React from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../panels/desks";
import { Columns } from "../panels/columns";
import { useAlertContext } from "../../context/alert-context";
import { useActivePanel } from "../../hooks/useActivePanel";

export const App = () => {
  const { activePanel, goToColumn, goToDesk } = useActivePanel();

  const { popout } = useAlertContext();

  return (
    <View activePanel={activePanel} popout={popout}>
      <Desks id="desks" onChangePanel={goToColumn} />
      <Columns id="columns" onChangePanel={goToDesk} />
    </View>
  );
};
