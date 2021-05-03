import React, { useCallback } from "react";
import { Cell } from "@vkontakte/vkui";
import { useAlertContext } from "../../../../context/alert-context";
import * as I from "./interfaces";

const Card: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({ card, removeCard }) => {
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
          action: () => removeCard(card),
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
  }, [clearPopoutHandler, removeCard, card, setPopoutHandler]);

  return (
    <Cell removable onRemove={question}>
      {card.name}
    </Cell>
  );
};

export { Card };
