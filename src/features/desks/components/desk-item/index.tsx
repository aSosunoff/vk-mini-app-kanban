import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { ActionSheetItem, Cell } from "@vkontakte/vkui";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { useSnackbarContext } from "../../../../context/snackbar-context";
import { useActivePanel } from "../../../../hooks/useActivePanel";
import { removeDesk } from "../../actions";
import { IDesks } from "../../interfaces/IDesks";
import { useActionSheetContext } from "../../../../context/action-sheet-context";

interface DeskItemProps {
  desk: IDesks;
}

export const DeskItem: React.FC<DeskItemProps> = ({ desk }) => {
  const dispatch = useDispatch();

  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const { setActionSheetHandler, clearActionSheetHandler } = useActionSheetContext();

  const { goToColumn } = useActivePanel();

  const subtitleTargetRef = useRef<HTMLDivElement>(null);

  const removeDeskHandler = useCallback(async () => {
    await dispatch(removeDesk(desk));

    setSnackbarHandler({
      onClose: clearSnackbarHandler,
      children: `Удалена доска "${desk.name}"`,
    });
  }, [clearSnackbarHandler, desk, dispatch, setSnackbarHandler]);

  const question = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      setActionSheetHandler({
        header: `Вы уверены в удалении доски ${desk.name}`,
        onClose: clearActionSheetHandler,
        iosCloseItem: (
          <ActionSheetItem autoclose mode="cancel">
            Отменить
          </ActionSheetItem>
        ),
        children: (
          <ActionSheetItem autoclose mode="destructive" onClick={removeDeskHandler}>
            Удалить
          </ActionSheetItem>
        ),
        toggleRef: subtitleTargetRef.current as Element,
      });
    },
    [clearActionSheetHandler, desk.name, removeDeskHandler, setActionSheetHandler]
  );

  return (
    <Cell
      expandable
      after={<Icon24DeleteOutline onClick={question} getRootRef={subtitleTargetRef} />}
      onClick={() => goToColumn(desk.id)}
    >
      {desk.name}
    </Cell>
  );
};
