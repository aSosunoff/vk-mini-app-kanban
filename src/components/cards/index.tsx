import React, { useCallback, useEffect, useState } from "react";
import { List } from "@vkontakte/vkui";
import { Card } from "../card";
import { useSnackbarContext } from "../../context/snackbar-context";
import { ICards } from "../../Interfaces/ICards";
import { CreateForm } from "../create-form";
import { createCard, getCards, deleteCard } from "../actions";

interface CardsProps {
  columnId: string;
}

const Cards: React.FC<CardsProps> = ({ columnId }) => {
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const [cards, setCards] = useState<ICards[]>([]);

  useEffect(() => {
    getCards(columnId)
      .then((cards) => {
        setCards(() => cards);
      })
      .catch(console.error);
  }, [columnId]);

  const createHandler = useCallback(
    async (name: string) => {
      try {
        const data = await createCard(columnId, name);

        setCards((prev) => [...prev, data]);

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Добавдена новая колонка "${(data as ICards).name}"`,
        });
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    },
    [clearSnackbarHandler, columnId, setSnackbarHandler]
  );

  const deleteHandler = useCallback(
    async (card: ICards) => {
      await deleteCard(card.id);

      setCards((prev) => prev.filter(({ id }) => id !== card.id));

      setSnackbarHandler({
        onClose: clearSnackbarHandler,
        children: `Удалена карточка "${card.name}"`,
      });
    },
    [clearSnackbarHandler, setSnackbarHandler]
  );

  return (
    <>
      <List>
        {cards.map((card) => (
          <Card key={card.id} onDelete={() => deleteHandler(card)}>
            {card.name}
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
