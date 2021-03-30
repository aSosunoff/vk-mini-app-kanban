import React, { useCallback, useEffect, useState } from "react";
import { Group, List, Panel, PanelHeaderSimple, Snackbar } from "@vkontakte/vkui";
import firebase from "firebase/app";

import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { useSnackbarContext } from "../../context/snackbar-context";
import { IDesks } from "../../Interfaces/IDesks";
import { CreateForm } from "../create-form";
import { DeskItem } from "../desk-item";

interface DesksProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
}

const Desks: React.FC<DesksProps> = ({ id, onChangePanel }) => {
  const { snackbar, setSnackbarHandler } = useSnackbarContext();

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

  const createDeskHandler = useCallback(
    async (name: string) => {
      try {
        const db = firebase.firestore();

        const docRef = await db.collection("desks").add({
          name,
        });

        const doc = await docRef.get();

        const data = doc.data();

        addDeskHandler({ id: doc.id, name: (data as IDesks).name });

        setSnackbarHandler(
          <Snackbar onClose={() => setSnackbarHandler(null)}>
            Добавдена новая доска "{(data as IDesks).name}"
          </Snackbar>
        );
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [addDeskHandler, setSnackbarHandler]
  );

  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <CreateForm
        onSubmit={createDeskHandler}
        buttonName="Создать доску"
        placeholder="введите название доски"
      />

      {descs && descs.length ? (
        <Group>
          <List>
            {descs.map(({ id, name }) => (
              <DeskItem key={id} id={id} onDelete={deleteDeskHandler} onDeskClick={onChangePanel}>
                {name}
              </DeskItem>
            ))}
          </List>
        </Group>
      ) : null}

      {/* <div>Панель с досками</div>
      <Button onClick={onChangePanel}>Перейти к колонкам</Button> */}

      {snackbar}
    </Panel>
  );
};

export { Desks };
