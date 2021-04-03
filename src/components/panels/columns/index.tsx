import React from "react";
import { Gallery, Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";

import { useSnackbarContext } from "../../../context/snackbar-context";
import styles from "./Columns.module.css";
import { Column } from "../../column";
import { CreateForm } from "../../create-form";
import { useAppStateContext } from "../../../context/app-state-context";

interface ColumnsProps extends Pick<PanelProps, "id"> {}

const Columns: React.FC<ColumnsProps> = ({ id }) => {
  const { snackbar } = useSnackbarContext();

  const { columns, createColumnHandler, activeDesk, goToDesk } = useAppStateContext();

  return (
    <Panel id={id} className={styles.columns}>
      <PanelHeader left={<PanelHeaderBack onClick={goToDesk} />}>
        Доска - {activeDesk?.name}
      </PanelHeader>

      <Gallery slideWidth="100%" align="center" className={styles.gallery} bullets="dark">
        {columns.map((column) => (
          <Column key={column.id} column={column}>
            {column.name}
          </Column>
        ))}

        <Group>
          <CreateForm
            onSubmit={createColumnHandler}
            buttonName="Создать колонку"
            placeholder="введите название колонки"
          />
        </Group>
      </Gallery>

      {snackbar}
    </Panel>
  );
};

export { Columns };
