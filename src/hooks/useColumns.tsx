import { useCallback, useEffect, useState } from "react";
import { createColumn, deleteColumn, getColumns } from "../components/actions";
import { useSnackbarContext } from "../context/snackbar-context";
import { IColumns } from "../Interfaces/IColumns";
import { IDesks } from "../Interfaces/IDesks";

export const useColumns = (activeDesk?: IDesks) => {
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

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

  return { columns, createColumnHandler, deleteColumnHandler };
};
