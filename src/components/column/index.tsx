import React, { useCallback } from "react";
import { Group, Header } from "@vkontakte/vkui";
import { Icon16Delete } from "@vkontakte/icons";
import { useAlertContext } from "../../context/alert-context";
import { Cards } from "../cards";

interface ColumnProps {
  onDelete: () => void;
  id: string;
}

const Column: React.FC<ColumnProps> = ({ id, children, onDelete }) => {
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
    <Group
      header={
        <Header mode="secondary" aside={<Icon16Delete onClick={question} />}>
          {children}
        </Header>
      }
    >
      <Cards columnId={id} />
    </Group>
  );
};

export { Column };
