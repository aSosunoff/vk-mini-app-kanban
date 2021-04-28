import React, { useCallback } from "react";
import { Group, Header } from "@vkontakte/vkui";
import { Icon16Delete } from "@vkontakte/icons";
import { Cards } from "../../../cards/components/cards";
import { useAlertContext } from "../../../../context/alert-context";
import * as I from "./interfaces";

const Column: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({
  column,
  removeColumn,
  children,
}) => {
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
  }, [children, clearPopoutHandler, column, removeColumn, setPopoutHandler]);

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
