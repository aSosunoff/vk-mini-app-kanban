import React, { useState } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../panels/desks";
import { Columns } from "../panels/columns";
import { useAlertContext } from "../../context/alert-context";
import { IDesks } from "../../Interfaces/IDesks";
import { useActivePanel } from "../../hooks/useActivePanel";
import { useColumnsState } from "../../hooks/useColumnsState";

export const App = () => {
  const { activePanel, goToColumn, goToDesk } = useActivePanel();

  const [activeDesk, setActiveDesk] = useState<IDesks>();

  const { popout } = useAlertContext();

  const { columns, createColumnHandler, deleteColumnHandler } = useColumnsState(activeDesk);

  return (
    <View activePanel={activePanel} popout={popout}>
      <Desks
        id="desks"
        onChangePanel={(desk) => {
          goToColumn();
          setActiveDesk(() => desk);
        }}
      />

      <Columns
        id="columns"
        columns={columns}
        onChangePanel={goToDesk}
        onCreateColumn={createColumnHandler}
        onDeleteColumn={deleteColumnHandler}
        activeDesk={activeDesk}
      />
    </View>
  );
};
