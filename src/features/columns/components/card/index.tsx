import React, { useCallback } from "react";
import { Cell } from "@vkontakte/vkui";
import { useAlertContext } from "../../../../context/alert-context";
import { ICard } from "../../interfaces/ICard";
import { removeCard } from "../../actions/cardActions";
import { useDispatch } from "react-redux";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { useActivePanel } from "../../../../hooks/useActivePanel";
import { useRoute } from "react-router5";

interface CardProps {
  card: ICard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const dispatch = useDispatch();

  const { goToCard } = useActivePanel();

  const { route } = useRoute();

  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const question = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.stopPropagation();

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
    },
    [setPopoutHandler, card, clearPopoutHandler, dispatch]
  );

  return (
    <Cell
      after={<Icon24DeleteOutline onClick={question} />}
      onClick={() => goToCard(route?.params?.deskId, card.columnId, card.id)}
    >
      {card.name}
    </Cell>
  );
};

export { Card };
