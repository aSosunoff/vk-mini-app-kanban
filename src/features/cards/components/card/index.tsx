import React, { useCallback } from "react";
import { Cell } from "@vkontakte/vkui";
import { useAlertContext } from "../../../../context/alert-context";

interface CardProps {
  onDelete: () => Promise<void>;
}

const Card: React.FC<CardProps> = ({ children, onDelete }) => {
  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const question = useCallback(() => {
    setPopoutHandler({
      header: "Внимание",
      text: `Вы уверены в удалении карточки ${children}`,
      actions: [
        {
          title: "Да",
          mode: "destructive",
          autoclose: true,
          action: onDelete,
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
  }, [children, clearPopoutHandler, onDelete, setPopoutHandler]);

  return (
    <Cell removable onRemove={question}>
      {children}
    </Cell>
  );
};

export { Card };
