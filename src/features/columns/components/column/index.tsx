import React, { useCallback } from "react";
import { Group, Header } from "@vkontakte/vkui";
import { Icon16Delete } from "@vkontakte/icons";
import { useAlertContext } from "../../../../context/alert-context";
import { Cards } from "../cards";
import { IColumn } from "../../interfaces/IColumns";
import { removeColumn } from "../../actions/columnActions";
import { useDispatch } from "react-redux";

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useDispatch();

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
          action: () => dispatch(removeColumn(column)),
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
  }, [clearPopoutHandler, column, dispatch, setPopoutHandler]);

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
