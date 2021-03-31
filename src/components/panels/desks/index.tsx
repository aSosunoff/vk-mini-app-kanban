import React, { useCallback, useEffect } from "react";
import { Group, List, Panel, PanelHeaderSimple, Snackbar } from "@vkontakte/vkui";
import firebase from "firebase/app";

import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { useSnackbarContext } from "../../../context/snackbar-context";
import { IDesks } from "../../../Interfaces/IDesks";
import { CreateForm } from "../../create-form";
import { DeskItem } from "../../desk-item";
import { createDesk } from "../../actions";

interface DesksProps extends Pick<PanelProps, "id"> {
  onChangePanel: (desk: IDesks) => void;
  desks: IDesks[];
  onSetDesks: (desks: IDesks[]) => void;
  onAddDesk: (desks: IDesks) => void;
  onDeleteDesk: (id: string) => void;
}

const Desks: React.FC<DesksProps> = ({
  id,
  desks,
  onChangePanel,
  onSetDesks,
  onAddDesk,
  onDeleteDesk,
}) => {
  const { snackbar, setSnackbarHandler } = useSnackbarContext();

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

        onSetDesks(desks);
      })
      .catch(console.error);
  }, [onSetDesks]);

  const createDeskHandler = useCallback(
    async (name: string) => {
      try {
        const data = await createDesk(name);

        onAddDesk(data);

        setSnackbarHandler(
          <Snackbar onClose={() => setSnackbarHandler(null)}>
            Добавдена новая доска "{(data as IDesks).name}"
          </Snackbar>
        );
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [onAddDesk, setSnackbarHandler]
  );

  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <CreateForm
        onSubmit={createDeskHandler}
        buttonName="Создать доску"
        placeholder="введите название доски"
      />

      {desks && desks.length ? (
        <Group>
          <List>
            {desks.map((desk) => (
              <DeskItem
                key={desk.id}
                id={desk.id}
                onDelete={onDeleteDesk}
                onDeskClick={() => onChangePanel(desk)}
              >
                {desk.name}
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
