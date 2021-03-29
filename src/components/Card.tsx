import React, { useCallback } from "react";
import firebase from "firebase/app";
import { Alert, Cell, Snackbar } from "@vkontakte/vkui";
import { useAlertContext } from "../context/alert-context";
import { useSnackbarContext } from "../context/snackbar-context";

interface CardProps {
  onDelete: (id: string) => void;
  id: string;
}

const Card: React.FC<CardProps> = ({ id, children, onDelete }) => {
  const { setSnackbarHandler } = useSnackbarContext();

  const { setPopoutHandler } = useAlertContext();

  const deleteHandler = useCallback(() => {
    const db = firebase.firestore();

    db.collection("cards")
      .doc(id)
      .delete()
      .then(() => {
        onDelete(id);

        setSnackbarHandler(
          <Snackbar onClose={() => setSnackbarHandler(null)}>
            Удалена карточка "{children}"
          </Snackbar>
        );
      })
      .catch(console.error);
  }, [id, children, onDelete, setSnackbarHandler]);

  const question = useCallback(() => {
    setPopoutHandler(
      <Alert
        header="Внимание"
        text={`Вы уверены в удалении карточки ${children}`}
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
    <Cell removable onRemove={question}>
      {children}
    </Cell>
  );
};

export { Card };
