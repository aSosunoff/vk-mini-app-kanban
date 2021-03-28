import React, { useCallback } from "react";
import firebase from "firebase/app";
import { Cell, Snackbar } from "@vkontakte/vkui";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { useSnackbarContext } from "../context/snackbar-context";

interface DeskItemProps {
  id: string;
  onDelete: (id: string) => void;
}

const DeskItem: React.FC<DeskItemProps> = ({ id, onDelete, children }) => {
  const { setSnackbarHandler } = useSnackbarContext();

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

  return (
    <Cell expandable after={<Icon24DeleteOutline onClick={deleteHandler} />}>
      {children}
    </Cell>
  );
};

export { DeskItem };
