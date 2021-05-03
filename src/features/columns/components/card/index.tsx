import React, { useCallback } from "react";
import { Cell } from "@vkontakte/vkui";
import { useAlertContext } from "../../../../context/alert-context";
import { ICard } from "../../interfaces/ICard";
import { removeCard } from "../../actions/cardActions";
import { useDispatch } from "react-redux";

interface CardProps {
  card: ICard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const dispatch = useDispatch();

  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const question = useCallback(() => {
    setPopoutHandler({
      header: "Внимание",
      text: `Вы уверены в удалении карточки ${card.name}`,
      actions: [
        {
          title: "Да",
          mode: "destructive",
          autoclose: true,
          action: () => dispatch(removeCard(card)),
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
  }, [setPopoutHandler, card, clearPopoutHandler, dispatch]);

  return (
    <Cell removable onRemove={question}>
      {card.name}
    </Cell>
  );
};

export { Card };
