import React, { useCallback, useEffect, useMemo } from "react";
import { Gallery, Group, Panel, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { useSnackbarContext } from "../../../context/snackbar-context";
import styles from "./Columns.module.css";
import { Column } from "../../column";
import { CreateForm } from "../../create-form";
import { useAppStateContext } from "../../../context/app-state-context";
import { useRoute } from "react-router5";
import * as I from "./interfaces";

const Columns: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({
  id,
  desks,
  columns,
  fetchColumns,
  addedColumns,
}) => {
  const { route } = useRoute();

  const { snackbar } = useSnackbarContext();

  const { goToDesk } = useAppStateContext();

  const activeDesk = useMemo(() => desks.find(({ id }) => id === route?.params?.deskId), [
    desks,
    route?.params?.deskId,
  ]);

  useEffect(() => {
    fetchColumns(route.params.deskId);
  }, [route.params.deskId, fetchColumns]);

  const createColumn = useCallback(
    async (name: string) => {
      if (route?.params?.deskId) {
        await addedColumns(route?.params?.deskId, name);
      }
    },
    [addedColumns, route?.params?.deskId]
  );

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
