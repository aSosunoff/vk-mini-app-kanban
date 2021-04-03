import React from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../panels/desks";
import { Columns } from "../panels/columns";
import { useAlertContext } from "../../context/alert-context";
import { useAppStateContext } from "../../context/app-state-context";

export const App = () => {
  const { popout } = useAlertContext();

  const { activePanel } = useAppStateContext();

  return (
    <View activePanel={activePanel} popout={popout}>
      <Desks id="desks" />
      <Columns id="columns" />
    </View>
  );
};
