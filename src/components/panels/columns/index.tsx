import React from "react";
import { Gallery, Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";

import { useSnackbarContext } from "../../../context/snackbar-context";
import styles from "./Columns.module.css";
import { Column } from "../../column";
import { IColumns } from "../../../Interfaces/IColumns";
import { CreateForm } from "../../create-form";
import { IDesks } from "../../../Interfaces/IDesks";

interface ColumnsProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
  activeDesk?: IDesks;
  columns: IColumns[];
  onCreateColumn: (name: string) => Promise<void>;
  onDeleteColumn: (columns: IColumns) => Promise<void>;
}

const Columns: React.FC<ColumnsProps> = ({
  id,
  onChangePanel,
  columns,
  activeDesk,
  onCreateColumn,
  onDeleteColumn,
}) => {
  const { snackbar } = useSnackbarContext();

  return (
    <Panel id={id} className={styles.columns}>
      <PanelHeader left={<PanelHeaderBack onClick={onChangePanel} />}>
        Доска - {activeDesk?.name}
      </PanelHeader>

      <Gallery slideWidth="100%" align="center" className={styles.gallery} bullets="dark">
        {columns.map((column) => (
          <Column key={column.id} id={column.id} onDelete={() => onDeleteColumn(column)}>
            {column.name}
          </Column>
        ))}

        <Group>
          <CreateForm
            onSubmit={onCreateColumn}
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
