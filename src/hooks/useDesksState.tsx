import { useCallback, useEffect, useState } from "react";
import { createDesk, deleteDesk, getDesks } from "../components/actions";
import { useSnackbarContext } from "../context/snackbar-context";
import { IDesks } from "../Interfaces/IDesks";

export const useDesksState = () => {
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

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

  return {
    descs,
    createDeskHandler,
    deleteDeskHandler,
  };
};
