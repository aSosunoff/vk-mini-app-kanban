import React, { useCallback } from "react";
import { Group, Header, Snackbar } from "@vkontakte/vkui";
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
  const { setSnackbarHandler } = useSnackbarContext();

  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

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
