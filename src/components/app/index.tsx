import React, { useCallback, useEffect, useState } from "react";
import { Snackbar, View } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../panels/desks";
import { Columns } from "../panels/columns";
import { useAlertContext } from "../../context/alert-context";
import { IDesks } from "../../Interfaces/IDesks";
import { createDesk, deleteDesk, getDesks } from "../actions";
import { useSnackbarContext } from "../../context/snackbar-context";

export const App = () => {
  const [activePanel, setActivePanel] = useState<"desks" | "columns">("desks");
  const [activeDesk, setActiveDesk] = useState<IDesks>();

  const { popout } = useAlertContext();
  const { setSnackbarHandler } = useSnackbarContext();

  /* Desk */
  const [descs, setDesks] = useState<IDesks[]>([]);

  useEffect(() => {
    getDesks()
      .then((desks) => setDesks(() => desks))
      .catch(console.error);
  }, []);

  const createDeskHandler = useCallback(
    async (name: string) => {
      try {
        const desk = await createDesk(name);

        setDesks((prev) => [...prev, desk]);

        setSnackbarHandler(
          <Snackbar onClose={() => setSnackbarHandler(null)}>
            Добавдена новая доска "{(desk as IDesks).name}"
          </Snackbar>
        );
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [setSnackbarHandler]
  );

  const deleteDeskHandler = useCallback(
    async (desk: IDesks) => {
      try {
        await deleteDesk(desk.id);

        setDesks((prev) => prev.filter(({ id }) => id !== desk.id));

        setSnackbarHandler(
          <Snackbar onClose={() => setSnackbarHandler(null)}>Удалена доска "{desk.name}"</Snackbar>
        );
      } catch (error) {
        console.error(error);
      }
    },
    [setSnackbarHandler]
  );
  /* Desk */

  return (
    <View activePanel={activePanel} popout={popout}>
      <Desks
        id="desks"
        onChangePanel={(desk) => {
          setActivePanel(() => "columns");
          setActiveDesk(() => desk);
        }}
        desks={descs}
        onCreateDesk={createDeskHandler}
        onDeleteDesk={deleteDeskHandler}
      />

      <Columns id="columns" onChangePanel={() => setActivePanel("desks")} activeDesk={activeDesk} />
    </View>
  );
};
