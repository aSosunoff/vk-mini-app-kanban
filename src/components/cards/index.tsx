import React, { useCallback, useEffect, useState } from "react";
import { List } from "@vkontakte/vkui";
import firebase from "firebase/app";
import { Card } from "../card";
import { useSnackbarContext } from "../../context/snackbar-context";
import { ICards } from "../../Interfaces/ICards";
import { CreateForm } from "../create-form";

interface CardsProps {
  columnId: string;
}

const Cards: React.FC<CardsProps> = ({ columnId }) => {
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const [cards, setCards] = useState<ICards[]>([]);

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("cards")
      .where("columnId", "==", columnId)
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
  }, [columnId]);

  const addHandler = useCallback((column: ICards) => {
    setCards((prev) => [...prev, column]);
  }, []);

  const deleteColumnHandler = useCallback((idRemoved) => {
    setCards((prev) => prev.filter(({ id }) => id !== idRemoved));
  }, []);

  const createHandler = useCallback(
    async (name: string) => {
      try {
        const db = firebase.firestore();

        const docRef = await db.collection("cards").add({
          name,
          columnId,
        });

        const doc = await docRef.get();

        const data = doc.data();

        addHandler({
          id: doc.id,
          name: (data as ICards).name,
          columnId: (data as ICards).columnId,
        });

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Добавдена новая колонка "${(data as ICards).name}"`,
        });
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [addHandler, clearSnackbarHandler, columnId, setSnackbarHandler]
  );

  return (
    <>
      <List>
        {cards.map(({ id, name }) => (
          <Card key={id} id={id} onDelete={deleteColumnHandler}>
            {name}
          </Card>
        ))}
      </List>

      <CreateForm
        onSubmit={createHandler}
        buttonName="Создать карточку"
        placeholder="введите название карточки"
      />
    </>
  );
};

export { Cards };
