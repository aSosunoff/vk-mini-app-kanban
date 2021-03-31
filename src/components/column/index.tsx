import React, { useCallback } from "react";
import { Group, Header } from "@vkontakte/vkui";
import { Icon16Delete } from "@vkontakte/icons";
import { useAlertContext } from "../../context/alert-context";
import { Cards } from "../cards";
import { useAppStateContext } from "../../context/app-state-context";
import { IColumns } from "../../Interfaces/IColumns";

interface ColumnProps {
  column: IColumns;
}

const Column: React.FC<ColumnProps> = ({ column, children }) => {
  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const { deleteColumnHandler } = useAppStateContext();

  const question = useCallback(() => {
    setPopoutHandler({
      header: "Внимание",
      text: `Вы уверены в удалении доски ${children}`,
      actions: [
        {
          title: "Да",
          mode: "destructive",
          autoclose: true,
          action: () => deleteColumnHandler(column),
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
  }, [children, clearPopoutHandler, column, deleteColumnHandler, setPopoutHandler]);

  return (
    <Group
      header={
        <Header mode="secondary" aside={<Icon16Delete onClick={question} />}>
          {children}
        </Header>
      }
    >
      <Cards columnId={column.id} />
    </Group>
  );
};

export { Column };
