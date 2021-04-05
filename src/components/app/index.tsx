import React, { useEffect } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { useRoute } from "react-router5";
import { Desks } from "../panels/desks";
import { Columns } from "../panels/columns";
import { useAlertContext } from "../../context/alert-context";
import { useAppStateContext } from "../../context/app-state-context";

const App: React.FC<{ hasError: boolean }> = ({ hasError }) => {
  const { popout, setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const { activePanel } = useAppStateContext();

  const { router } = useRoute();

  console.log(router);

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
    <View activePanel={activePanel} popout={popout}>
      <Desks id="desks" />
      <Columns id="columns" />
    </View>
  );
};

export { App };
