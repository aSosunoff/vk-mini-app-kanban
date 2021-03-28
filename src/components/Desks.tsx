import React, { useCallback, useEffect, useState } from "react";
import { Panel, PanelHeaderSimple } from "@vkontakte/vkui";
import firebase from "firebase/app";

import { DeskList } from "./DeskList";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { DeskCreate } from "./DeskCreate";
import { useSnackbarContext } from "../context/snackbar-context";
import { IDesks } from "../Interfaces/IDesks";

interface DesksProps extends Pick<PanelProps, "id"> {}

const Desks: React.FC<DesksProps> = ({ id }) => {
  const { snackbar } = useSnackbarContext();

  const [descs, setDesks] = useState<IDesks[]>([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("desks")
      .get()
      .then((querySnapshot) => {
        const desks: IDesks[] = [];

        querySnapshot.forEach((desk) => {
          desks.push({
            id: desk.id,
            name: desk.data().name,
          });
        });

        setDesks(() => desks);
      })
      .catch(console.error);
  }, []);

  const addDeskHandler = useCallback((desk) => {
    setDesks((prev) => [...prev, desk]);
  }, []);

  const deleteDeskHandler = useCallback((deskIdRemoved) => {
    setDesks((prev) => prev.filter(({ id }) => id !== deskIdRemoved));
  }, []);

  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <DeskCreate onCreate={addDeskHandler} />

      <DeskList list={descs} onDeleteDesk={deleteDeskHandler} />

      {/* <div>Панель с досками</div>
      <Button onClick={onChangePanel}>Перейти к колонкам</Button> */}

      {snackbar}
    </Panel>
  );
};

export { Desks };
