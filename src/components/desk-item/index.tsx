import React, { useCallback } from "react";
import firebase from "firebase/app";
import { Cell, Snackbar } from "@vkontakte/vkui";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { useSnackbarContext } from "../../context/snackbar-context";
import { useAlertContext } from "../../context/alert-context";

interface DeskItemProps {
  id: string;
  onDelete: (id: string) => void;
  onDeskClick: () => void;
}

const DeskItem: React.FC<DeskItemProps> = ({ id, onDelete, children, onDeskClick }) => {
  const { setSnackbarHandler } = useSnackbarContext();

  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const deleteHandler = useCallback(() => {
    const db = firebase.firestore();

    db.collection("desks")
      .doc(id)
      .delete()
      .then(() => {
        onDelete(id);

        setSnackbarHandler(
          <Snackbar onClose={() => setSnackbarHandler(null)}>Удалена доска "{children}"</Snackbar>
        );
      })
      .catch(console.error);
  }, [children, id, onDelete, setSnackbarHandler]);

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
    <Cell expandable after={<Icon24DeleteOutline onClick={question} />} onClick={onDeskClick}>
      {children}
    </Cell>
  );
};

export { DeskItem };
