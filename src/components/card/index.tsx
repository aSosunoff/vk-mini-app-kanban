import React, { useCallback } from "react";
import firebase from "firebase/app";
import { Cell } from "@vkontakte/vkui";
import { useAlertContext } from "../../context/alert-context";
import { useSnackbarContext } from "../../context/snackbar-context";

interface CardProps {
  onDelete: (id: string) => void;
  id: string;
}

const Card: React.FC<CardProps> = ({ id, children, onDelete }) => {
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const deleteHandler = useCallback(() => {
    const db = firebase.firestore();

    db.collection("cards")
      .doc(id)
      .delete()
      .then(() => {
        onDelete(id);

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Удалена карточка "${children}"`,
        });
      })
      .catch(console.error);
  }, [children, clearSnackbarHandler, id, onDelete, setSnackbarHandler]);

  const question = useCallback(() => {
    setPopoutHandler({
      header: "Внимание",
      text: `Вы уверены в удалении карточки ${children}`,
      actions: [
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
      ],
      actionsLayout: "vertical",
      onClose: clearPopoutHandler,
    });
  }, [children, clearPopoutHandler, deleteHandler, setPopoutHandler]);

  return (
    <Cell removable onRemove={question}>
      {children}
    </Cell>
  );
};

export { Card };
