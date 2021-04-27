import React, { useCallback } from "react";
import { Cell } from "@vkontakte/vkui";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { useAlertContext } from "../../context/alert-context";
import { useAppStateContext } from "../../context/app-state-context";
import * as I from "./interfaces";
import { useSnackbarContext } from "../../context/snackbar-context";

export const DeskItem: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({
  children,
  desk,
  removeDesk,
}) => {
  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const { goToColumn } = useAppStateContext();

  const removeDeskHandler = useCallback(async () => {
    await removeDesk(desk);

    setSnackbarHandler({
      onClose: clearSnackbarHandler,
      children: `Удалена доска "${desk.name}"`,
    });
  }, [clearSnackbarHandler, desk, removeDesk, setSnackbarHandler]);

  const question = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      setPopoutHandler({
        header: "Внимание",
        text: `Вы уверены в удалении доски ${children}`,
        actions: [
          {
            title: "Да",
            mode: "destructive",
            autoclose: true,
            action: removeDeskHandler,
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
    },
    [children, clearPopoutHandler, removeDeskHandler, setPopoutHandler]
  );

  return (
    <Cell
      expandable
      after={<Icon24DeleteOutline onClick={question} />}
      onClick={() => goToColumn(desk.id)}
    >
      {children}
    </Cell>
  );
};
