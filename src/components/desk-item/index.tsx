import React, { useCallback } from "react";
import { Cell } from "@vkontakte/vkui";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { useAlertContext } from "../../context/alert-context";

interface DeskItemProps {
  id: string;
  onDelete: () => void;
  onDeskClick: () => void;
}

const DeskItem: React.FC<DeskItemProps> = ({ children, onDeskClick, onDelete }) => {
  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const question = useCallback(() => {
    setPopoutHandler({
      header: "Внимание",
      text: `Вы уверены в удалении доски ${children}`,
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
    <Cell expandable after={<Icon24DeleteOutline onClick={question} />} onClick={onDeskClick}>
      {children}
    </Cell>
  );
};

export { DeskItem };
