import React, { useCallback } from "react";
import { Alert, CardGrid, Group, Header, Snackbar } from "@vkontakte/vkui";
import firebase from "firebase/app";
import { Icon16Delete } from "@vkontakte/icons";
import styles from "./Column.module.css";
import { ColumnCard } from "./ColumnCard";
import { useSnackbarContext } from "../context/snackbar-context";
import { useAlertContext } from "../context/alert-context";

interface ColumnProps {
  onDelete: (id: string) => void;
  id: string;
  name: string;
}

const Column: React.FC<ColumnProps> = ({ id, name, onDelete }) => {
  const { setSnackbarHandler } = useSnackbarContext();

  const { setPopoutHandler } = useAlertContext();

  const deleteHandler = useCallback(() => {
    const db = firebase.firestore();

    db.collection("columns")
      .doc(id)
      .delete()
      .then(() => {
        onDelete(id);

        setSnackbarHandler(
          <Snackbar onClose={() => setSnackbarHandler(null)}>Удалена колонка "{name}"</Snackbar>
        );
      })
      .catch(console.error);
  }, [id, name, onDelete, setSnackbarHandler]);

  const question = useCallback(() => {
    setPopoutHandler(
      <Alert
        header="Внимание"
        text={`Вы уверены в удалении доски ${name}`}
        actions={[
          {
            title: "Да",
            mode: "destructive",
            autoclose: true,
            action: deleteHandler,
          },
          {
            title: "Передумал",
            mode: "cancel",
            autoclose: true,
          },
        ]}
        actionsLayout="vertical"
        onClose={() => setPopoutHandler(null)}
      />
    );
  }, [deleteHandler, name, setPopoutHandler]);

  return (
    <Group
      header={
        <Header mode="secondary" aside={<Icon16Delete onClick={question} />}>
          {name}
        </Header>
      }
    >
      <CardGrid size="l">
        <ColumnCard>a</ColumnCard>
        <ColumnCard>b</ColumnCard>
        <ColumnCard>c</ColumnCard>
      </CardGrid>
    </Group>
  );
};

export { Column };
