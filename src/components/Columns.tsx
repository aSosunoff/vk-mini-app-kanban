import React, { useEffect, useState } from "react";
import { Button, Div, Gallery, Panel, PanelHeaderSimple } from "@vkontakte/vkui";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import firebase from "firebase/app";

import { useSnackbarContext } from "../context/snackbar-context";
import styles from "./Columns.module.css";
import { Column } from "./Column";
import { IColumns } from "../Interfaces/IColumns";

interface ColumnsProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
}

const Columns: React.FC<ColumnsProps> = ({ id, onChangePanel }) => {
  const { snackbar } = useSnackbarContext();

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

  return (
    <Panel id={id} className={styles.columns}>
      <PanelHeaderSimple>Доска</PanelHeaderSimple>

      <Div>
        <Gallery slideWidth="100%" align="center">
          {columns.map((column) => (
            <Column key={column.id} />
          ))}
        </Gallery>
      </Div>

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
