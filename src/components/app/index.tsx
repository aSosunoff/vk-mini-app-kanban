import React, { useCallback, useEffect, useState } from "react";
import { View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../panels/desks";
import { Columns } from "../panels/columns";
import { useAlertContext } from "../../context/alert-context";
import { IDesks } from "../../Interfaces/IDesks";
import {
  createColumn,
  createDesk,
  deleteColumn,
  deleteDesk,
  getColumns,
  getDesks,
} from "../actions";
import { useSnackbarContext } from "../../context/snackbar-context";
import { IColumns } from "../../Interfaces/IColumns";

export const App = () => {
  const [activePanel, setActivePanel] = useState<"desks" | "columns">("desks");
  const [activeDesk, setActiveDesk] = useState<IDesks>();

  const { popout } = useAlertContext();
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  /* Desk */
  const [descs, setDesks] = useState<IDesks[]>([]);

  useEffect(() => {
    let isFetch = true;

    getDesks()
      .then((desks) => isFetch && setDesks(() => desks))
      .catch(console.error);

    return () => {
      isFetch = false;
    };
  }, []);

  const createDeskHandler = useCallback(
    async (name: string) => {
      try {
        const desk = await createDesk(name);

        setDesks((prev) => [...prev, desk]);

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Добавдена новая доска "${desk.name}"`,
        });
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [clearSnackbarHandler, setSnackbarHandler]
  );

  const deleteDeskHandler = useCallback(
    async (desk: IDesks) => {
      try {
        await deleteDesk(desk.id);

        setDesks((prev) => prev.filter(({ id }) => id !== desk.id));

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Удалена доска "${desk.name}"`,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [clearSnackbarHandler, setSnackbarHandler]
  );
  /* Desk */

  /* Columns */
  const [columns, setColumns] = useState<IColumns[]>([]);

  useEffect(() => {
    let isFetch = true;

    if (activeDesk) {
      getColumns(activeDesk.id)
        .then((columns) => isFetch && setColumns(() => columns))
        .catch(console.error);
    }

    return () => {
      isFetch = false;
    };
  }, [activeDesk]);

  const createColumnHandler = useCallback(
    async (name: string) => {
      try {
        if (activeDesk) {
          const data = await createColumn(activeDesk.id, name);

          setColumns((prev) => [...prev, data]);

          setSnackbarHandler({
            onClose: clearSnackbarHandler,
            children: `Добавдена новая колонка "${(data as IColumns).name}"`,
          });
        }
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [activeDesk, clearSnackbarHandler, setSnackbarHandler]
  );

  const deleteColumnHandler = useCallback(
    async (column: IColumns) => {
      try {
        await deleteColumn(column.id);

        setColumns((prev) => prev.filter(({ id }) => id !== column.id));

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Удалена колонка "${column.name}"`,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [clearSnackbarHandler, setSnackbarHandler]
  );
  /* Columns */

  return (
    <View activePanel={activePanel} popout={popout}>
      <Desks
        id="desks"
        desks={descs}
        onChangePanel={(desk) => {
          setActivePanel(() => "columns");
          setActiveDesk(() => desk);
        }}
        onCreateDesk={createDeskHandler}
        onDeleteDesk={deleteDeskHandler}
      />

      <Columns
        id="columns"
        columns={columns}
        onChangePanel={() => setActivePanel("desks")}
        onCreateColumn={createColumnHandler}
        onDeleteColumn={deleteColumnHandler}
        activeDesk={activeDesk}
      />
    </View>
  );
};
