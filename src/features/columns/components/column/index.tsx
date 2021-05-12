import React, { useCallback, useRef } from "react";
import { ActionSheetItem, Group, Header } from "@vkontakte/vkui";
import { Icon16Delete } from "@vkontakte/icons";
import { Cards } from "../cards";
import { IColumn } from "../../interfaces/IColumns";
import { removeColumn } from "../../actions/columnActions";
import { useDispatch } from "react-redux";
import { useActionSheetContext } from "../../../../context/action-sheet-context";

interface ColumnProps {
  column: IColumn;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const dispatch = useDispatch();

  const { setActionSheetHandler, clearActionSheetHandler } = useActionSheetContext();

  const subtitleTargetRef = useRef<HTMLDivElement>(null);

  const question = useCallback(() => {
    setActionSheetHandler({
      header: `Вы уверены в удалении доски ${column.name}`,
      onClose: clearActionSheetHandler,
      iosCloseItem: (
        <ActionSheetItem autoclose mode="cancel">
          Отменить
        </ActionSheetItem>
      ),
      children: (
        <ActionSheetItem
          autoclose
          mode="destructive"
          onClick={() => dispatch(removeColumn(column))}
        >
          Удалить
        </ActionSheetItem>
      ),
      toggleRef: subtitleTargetRef.current as Element,
    });
  }, [clearActionSheetHandler, column, dispatch, setActionSheetHandler]);

  return (
    <Group
      header={
        <Header
          mode="secondary"
          aside={<Icon16Delete onClick={question} getRootRef={subtitleTargetRef} />}
        >
          {column.name}
        </Header>
      }
    >
      <Cards columnId={column.id} />
    </Group>
  );
};

export { Column };
