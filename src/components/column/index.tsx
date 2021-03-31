import React, { useCallback } from "react";
import { Group, Header } from "@vkontakte/vkui";
import firebase from "firebase/app";
import { Icon16Delete } from "@vkontakte/icons";
import { useSnackbarContext } from "../../context/snackbar-context";
import { useAlertContext } from "../../context/alert-context";
import { Cards } from "../cards";

interface ColumnProps {
  onDelete: (id: string) => void;
  id: string;
}

const Column: React.FC<ColumnProps> = ({ id, children, onDelete }) => {
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const deleteHandler = useCallback(() => {
    const db = firebase.firestore();

    db.collection("columns")
      .doc(id)
      .delete()
      .then(() => {
        onDelete(id);

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Удалена колонка "${children}"`,
        });
      })
      .catch(console.error);
  }, [children, clearSnackbarHandler, id, onDelete, setSnackbarHandler]);

  const question = useCallback(() => {
    setPopoutHandler({
      header: "Внимание",
      text: `Вы уверены в удалении доски ${children}`,
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
    <Group
      header={
        <Header mode="secondary" aside={<Icon16Delete onClick={question} />}>
          {children}
        </Header>
      }
    >
      <Cards columnId={id} />
    </Group>
  );
};

export { Column };
