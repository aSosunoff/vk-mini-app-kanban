import React, { useCallback } from "react";
import { Alert, Group, Header, Snackbar } from "@vkontakte/vkui";
import firebase from "firebase/app";
import { Icon16Delete } from "@vkontakte/icons";
import { useSnackbarContext } from "../context/snackbar-context";
import { useAlertContext } from "../context/alert-context";
import { Cards } from "./Cards";

interface ColumnProps {
  onDelete: (id: string) => void;
  id: string;
}

const Column: React.FC<ColumnProps> = ({ id, children, onDelete }) => {
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
          <Snackbar onClose={() => setSnackbarHandler(null)}>Удалена колонка "{children}"</Snackbar>
        );
      })
      .catch(console.error);
  }, [id, children, onDelete, setSnackbarHandler]);

  const question = useCallback(() => {
    setPopoutHandler(
      <Alert
        header="Внимание"
        text={`Вы уверены в удалении доски ${children}`}
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
  }, [deleteHandler, children, setPopoutHandler]);

  return (
    <Group
      header={
        <Header mode="secondary" aside={<Icon16Delete onClick={question} />}>
          {children}
        </Header>
      }
    >
      <Cards />
    </Group>
  );
};

export { Column };
