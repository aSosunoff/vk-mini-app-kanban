import React, { useCallback, useEffect, useState } from "react";
import { Gallery, Group, Panel, PanelHeader, PanelHeaderBack, Snackbar } from "@vkontakte/vkui";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import firebase from "firebase/app";

import { useSnackbarContext } from "../../context/snackbar-context";
import styles from "./Columns.module.css";
import { Column } from "../column";
import { IColumns } from "../../Interfaces/IColumns";
import { CreateForm } from "../create-form";
import { IDesks } from "../../Interfaces/IDesks";

interface ColumnsProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
  activeDesk?: IDesks;
}

const Columns: React.FC<ColumnsProps> = ({ id, onChangePanel, activeDesk }) => {
  const { snackbar, setSnackbarHandler } = useSnackbarContext();

  const [columns, setColumns] = useState<IColumns[]>([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("columns")
      .where("deskId", "==", activeDesk?.id)
      .get()
      .then((querySnapshot) => {
        const columns: IColumns[] = [];

        querySnapshot.forEach((doc) => {
          const { deskId, name } = doc.data() as IColumns;

          columns.push({
            id: doc.id,
            deskId,
            name,
          });
        });

        setColumns(() => columns);
      })
      .catch(console.error);
  }, [activeDesk?.id]);

  const addColumnHandler = useCallback((column: IColumns) => {
    setColumns((prev) => [...prev, column]);
  }, []);

  const deleteColumnHandler = useCallback((columnIdRemoved) => {
    setColumns((prev) => prev.filter(({ id }) => id !== columnIdRemoved));
  }, []);

  const createColumnHandler = useCallback(
    async (name: string) => {
      try {
        const db = firebase.firestore();

        const docRef = await db.collection("columns").add({
          name,
          deskId: activeDesk?.id,
        });

        const doc = await docRef.get();

        const data = doc.data();

        addColumnHandler({
          id: doc.id,
          name: (data as IColumns).name,
          deskId: (data as IColumns).deskId,
        });

        setSnackbarHandler(
          <Snackbar onClose={() => setSnackbarHandler(null)}>
            Добавдена новая колонка "{(data as IColumns).name}"
          </Snackbar>
        );
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [activeDesk?.id, addColumnHandler, setSnackbarHandler]
  );

  return (
    <Panel id={id} className={styles.columns}>
      <PanelHeader left={<PanelHeaderBack onClick={onChangePanel} />}>
        Доска - {activeDesk?.name}
      </PanelHeader>

      <Gallery slideWidth="100%" align="center" className={styles.gallery} bullets="dark">
        {columns.map((column) => (
          <Column key={column.id} id={column.id} onDelete={deleteColumnHandler}>
            {column.name}
          </Column>
        ))}

        <Group>
          <CreateForm
            onSubmit={createColumnHandler}
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
