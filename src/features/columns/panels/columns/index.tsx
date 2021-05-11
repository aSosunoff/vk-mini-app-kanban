import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Gallery, Group, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { useSnackbarContext } from "../../../../context/snackbar-context";
import styles from "./columns.module.css";
import { Column } from "../../components/column";
import { CreateForm } from "../../../../components/create-form";
import { useRoute } from "react-router5";
import { panel } from "../../../../hooks/useActivePanel";
import { fetchColumns, addedColumns } from "../../actions/columnActions";
import { useDeskSelector } from "../../../desks/selectors";
import { useColumnsSelectors } from "../../selectors";

interface ColumnsProps {}

const Columns: React.FC<ColumnsProps> = () => {
  const dispatch = useDispatch();

  const { snackbar } = useSnackbarContext();

  const { route, router } = useRoute();

  const desk = useDeskSelector(route?.params?.deskId);

  const columns = useColumnsSelectors();

  useEffect(() => {
    if (route.params.deskId) {
      dispatch(fetchColumns(route.params.deskId));
    }
  }, [route.params.deskId, dispatch]);

  const createColumn = useCallback(
    async (name: string) => {
      if (route?.params?.deskId) {
        await dispatch(addedColumns(route?.params?.deskId, name));
      }
    },
    [dispatch, route?.params?.deskId]
  );

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={() => router.navigate(panel.DESKS)} />}>
        Доска - {desk?.name}
      </PanelHeader>

      <Gallery slideWidth="100%" align="center" className={styles.gallery} bullets="dark">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
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
    </>
  );
};

export { Columns };
