import React, { useState, useEffect } from "react";
import { View, Panel, Button } from "@vkontakte/vkui";

import { AdaptivityProvider, AppRoot } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

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
          <Panel id={panel.desks}>
            <div>Панель с досками</div>
            <Button onClick={() => setActivePanel(panel.columns)}>Перейти к колонкам</Button>
          </Panel>
          <Panel id={panel.columns}>
            <div>Панель с колонками</div>
            <Button onClick={() => setActivePanel(panel.desks)}>Перейти к доскам</Button>
          </Panel>
        </View>
      </AppRoot>
    </AdaptivityProvider>
  );
};
