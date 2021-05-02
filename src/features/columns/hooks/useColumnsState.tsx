import { useCallback, useState } from "react";
import { useSnackbarContext } from "../../../context/snackbar-context";
import { createColumn, deleteColumn } from "../../../api/columnsApi";
import { IColumn } from "../interfaces/IColumns";

export const useColumnsState = () => {
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const [columns, setColumns] = useState<IColumn[]>([]);

  const setColumnsHandler = useCallback((columns: IColumn[]) => setColumns(() => columns), []);

  const createColumnHandler = useCallback(
    async (deskId: string, name: string) => {
      try {
        const data = await createColumn(deskId, name);

        setColumns((prev) => [...prev, data]);

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Добавдена новая колонка "${(data as IColumn).name}"`,
        });
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [clearSnackbarHandler, setSnackbarHandler]
  );

  const deleteColumnHandler = useCallback(
    async (column: IColumn) => {
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

  return { columns, createColumnHandler, deleteColumnHandler, setColumnsHandler };
};
