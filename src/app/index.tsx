import React, { useEffect } from "react";
import { Panel, View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../features/desks/panels/desks";
import { Columns } from "../features/columns/panels/columns";
import { useAlertContext } from "../context/alert-context";
import { panel } from "../hooks/useActivePanel";
import { useRoute } from "react-router5";
import { Card } from "../features/columns/panels/card";
import { useActionSheetContext } from "../context/action-sheet-context";
import { Modal } from "../components/modal";

const App: React.FC<{ hasError: boolean }> = ({ hasError }) => {
  const { route } = useRoute();

  const { popout: popoutAlert, setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const { popout: popoutActionSheet } = useActionSheetContext();

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
    <View activePanel={route.name} popout={popoutAlert || popoutActionSheet} modal={<Modal />}>
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
