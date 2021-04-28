import { useCallback, useEffect, useState } from "react";
import { createCard, deleteCard, getCards } from "../../../api/cardsApi";
import { useSnackbarContext } from "../../../context/snackbar-context";
import { ICards } from "../Interfaces/ICards";

export const useCardsState = (columnId: string) => {
  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const [cards, setCards] = useState<ICards[]>([]);

  useEffect(() => {
    let isFetch = true;

    getCards(columnId)
      .then((cards) => isFetch && setCards(() => cards))
      .catch(console.error);

    return () => {
      isFetch = false;
    };
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

  return {
    cards,
    createHandler,
    deleteHandler,
  };
};
