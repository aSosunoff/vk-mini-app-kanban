import React, { useCallback } from "react";
import { Group, Header } from "@vkontakte/vkui";
import { Icon16Delete } from "@vkontakte/icons";
import { useAlertContext } from "../../../../context/alert-context";
import * as I from "./interfaces";
import { Cards } from "../cards";

const Column: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({
  column,
  removeColumn,
}) => {
  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const question = useCallback(() => {
    setPopoutHandler({
      header: "Внимание",
      text: `Вы уверены в удалении доски ${column.name}`,
      actions: [
        {
          title: "Да",
          mode: "destructive",
          autoclose: true,
          action: () => removeColumn(column),
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
  }, [clearPopoutHandler, column, removeColumn, setPopoutHandler]);

  return (
    <Group
      header={
        <Header mode="secondary" aside={<Icon16Delete onClick={question} />}>
          {column.name}
        </Header>
      }
    >
      <Cards columnId={column.id} />
    </Group>
  );
};

export { Column };
