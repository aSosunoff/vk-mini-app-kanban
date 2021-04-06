import React, { useCallback, useEffect } from "react";
import { Gallery, Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";

import { useSnackbarContext } from "../../../context/snackbar-context";
import styles from "./Columns.module.css";
import { Column } from "../../column";
import { CreateForm } from "../../create-form";
import { useAppStateContext } from "../../../context/app-state-context";
import { useRoute } from "react-router5";
import { getColumns } from "../../actions";

interface ColumnsProps extends Pick<PanelProps, "id"> {}

const Columns: React.FC<ColumnsProps> = ({ id }) => {
  const { route } = useRoute();

  const { snackbar } = useSnackbarContext();

  const { columns, setColumnsHandler, createColumnHandler, goToDesk } = useAppStateContext();

  useEffect(() => {
    let isFetch = true;

    if (route?.params?.deskId) {
      getColumns(route.params.deskId)
        .then((columns) => isFetch && setColumnsHandler(columns))
        .catch(console.error);
    }

    return () => {
      isFetch = false;
    };
  }, [route.params.deskId, setColumnsHandler]);

  const createColumn = useCallback(
    async (name: string) => {
      if (route?.params?.deskId) {
        await createColumnHandler(route?.params?.deskId, name);
      }
    },
    [createColumnHandler, route?.params?.deskId]
  );

  return (
    <Panel id={id} className={styles.columns}>
      <PanelHeader left={<PanelHeaderBack onClick={goToDesk} />}>
        Доска - {/* {activeDesk?.name} */}
      </PanelHeader>

      <Gallery slideWidth="100%" align="center" className={styles.gallery} bullets="dark">
        {columns.map((column) => (
          <Column key={column.id} column={column}>
            {column.name}
          </Column>
        ))}

        <Group>
          <CreateForm
            onSubmit={createColumn}
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
