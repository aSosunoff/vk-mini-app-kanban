import React, { useCallback, useEffect, useState } from "react";
import { Alert, CardGrid, Group, Header, Snackbar } from "@vkontakte/vkui";
import firebase from "firebase/app";
import { Icon16Delete } from "@vkontakte/icons";
import { ColumnCard } from "./ColumnCard";
import { useSnackbarContext } from "../context/snackbar-context";
import { useAlertContext } from "../context/alert-context";
import { ICards } from "../Interfaces/ICards";

interface CardsProps {}

const Cards: React.FC<CardsProps> = () => {
  const [cards, setCards] = useState<ICards[]>([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("cards")
      .get()
      .then((querySnapshot) => {
        const cards: ICards[] = [];

        querySnapshot.forEach((doc) => {
          const { columnId, name } = doc.data() as ICards;

          cards.push({
            id: doc.id,
            columnId,
            name,
          });
        });

        setCards(() => cards);
      })
      .catch(console.error);
  }, []);

  /* const { setSnackbarHandler } = useSnackbarContext(); */

  /* const { setPopoutHandler } = useAlertContext(); */

  /* const deleteHandler = useCallback(() => {
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
  }, [id, name, onDelete, setSnackbarHandler]); */

  /* const question = useCallback(() => {
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
  }, [deleteHandler, name, setPopoutHandler]); */

  return (
    <CardGrid size="l">
      {cards.map(({ id, name }) => (
        <ColumnCard key={id}>{name}</ColumnCard>
      ))}
    </CardGrid>
  );
};

export { Cards };
