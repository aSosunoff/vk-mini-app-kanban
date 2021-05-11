import React, { useEffect } from "react";
import { Panel, View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../features/desks/panels/desks";
import { Columns } from "../features/columns/panels/columns";
import { useAlertContext } from "../context/alert-context";
import { panel } from "../hooks/useActivePanel";
import { useRoute } from "react-router5";
import { Card } from "../features/card/panels/card";

const App: React.FC<{ hasError: boolean }> = ({ hasError }) => {
  const { route } = useRoute();

  const { popout, setPopoutHandler, clearPopoutHandler } = useAlertContext();

  useEffect(() => {
    if (hasError) {
      setPopoutHandler({
        header: "Внимание",
        text: "Возникла ошибка",
        actions: [
          {
            title: "понял",
            mode: "default",
            autoclose: true,
          },
        ],
        actionsLayout: "vertical",
        onClose: clearPopoutHandler,
      });
    }
  }, [hasError, setPopoutHandler, clearPopoutHandler]);

  return (
    <View activePanel={route.name} popout={popout}>
      <Panel id={panel.DESKS}>
        <Desks />
      </Panel>

      <Panel
        id={panel.COLUMNS}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Columns />
      </Panel>

      <Panel id={panel.CARD}>
        <Card />
      </Panel>
    </View>
  );
};

export { App };
