import React, { useEffect } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../features/desks/panels/desks";
import { Columns } from "../features/columns/panels/columns";
import { useAlertContext } from "../context/alert-context";
import { panel } from "../hooks/useActivePanel";
import { useRoute } from "react-router5";

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

  useEffect(() => {
    console.log(route.name);
  }, [route.name]);

  return (
    <View activePanel={route.name} popout={popout}>
      <Desks id={panel.DESKS} />

      <Columns id={panel.COLUMNS} />
    </View>
  );
};

export { App };
