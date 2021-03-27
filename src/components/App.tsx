import React, { useState } from "react";
import { View } from "@vkontakte/vkui";

import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "./Desks";
import { Columns } from "./Columns";

const panel = {
  desks: "desks",
  columns: "columns",
};

export const App = () => {
  const [activePanel, setActivePanel] = useState(panel.desks);

  return (
    <AdaptivityProvider>
      <AppRoot>
        <View activePanel={activePanel}>
          <Desks id={panel.desks} onChangePanel={() => setActivePanel(panel.columns)} />
          <Columns id={panel.columns} onChangePanel={() => setActivePanel(panel.desks)} />
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};
