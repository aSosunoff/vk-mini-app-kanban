import React, { useCallback, useEffect, useState } from "react";
import { Button, Div, Gallery, Group, Panel, PanelHeaderSimple, Snackbar } from "@vkontakte/vkui";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import firebase from "firebase/app";

import { useSnackbarContext } from "../context/snackbar-context";
import styles from "./Columns.module.css";
import { Column } from "./Column";
import { IColumns } from "../Interfaces/IColumns";
import { CreateForm } from "./CreateForm";

interface ColumnsProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
}

const Columns: React.FC<ColumnsProps> = ({ id, onChangePanel }) => {
  const { snackbar, setSnackbarHandler } = useSnackbarContext();

  const [columns, setColumns] = useState<IColumns[]>([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("columns")
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
  }, []);

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
          deskId: "",
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
    [addColumnHandler, setSnackbarHandler]
  );

  return (
    <Panel id={id} className={styles.columns}>
      <PanelHeaderSimple>Доска</PanelHeaderSimple>

      <Gallery slideWidth="100%" align="center" className={styles.gallery} bullets="dark">
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            onDelete={deleteColumnHandler}
            name={column.name}
          />
        ))}

        <Group>
          <CreateForm
            onSubmit={createColumnHandler}
            buttonName="Создать колонку"
            placeholder="введите название колонки"
          />
        </Group>
      </Gallery>

      <Div>
        <Button stretched onClick={onChangePanel}>
          Перейти к колонкам
        </Button>
      </Div>

      {snackbar}
    </Panel>
  );
};

export { Columns };
