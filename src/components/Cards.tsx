import React, { useCallback, useEffect, useState } from "react";
import { Alert, CardGrid, Cell, Group, Header, List, Snackbar } from "@vkontakte/vkui";
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

  const addColumnHandler = useCallback((column: ICards) => {
    setCards((prev) => [...prev, column]);
  }, []);

  const deleteColumnHandler = useCallback((idRemoved) => {
    setCards((prev) => prev.filter(({ id }) => id !== idRemoved));
  }, []);

  return (
    <List>
      {cards.map(({ id, name }) => (
        <ColumnCard key={id} id={id} onDelete={deleteColumnHandler}>
          {name}
        </ColumnCard>
      ))}
    </List>
  );
};

export { Cards };
