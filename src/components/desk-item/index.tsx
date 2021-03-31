import React, { useCallback } from "react";
import { Cell } from "@vkontakte/vkui";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { useAlertContext } from "../../context/alert-context";
import { IDesks } from "../../Interfaces/IDesks";
import { useAppStateContext } from "../../context/app-state-context";

interface DeskItemProps {
  desk: IDesks;
  onDeskClick: () => void;
}

const DeskItem: React.FC<DeskItemProps> = ({ children, desk, onDeskClick }) => {
  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const { deleteDeskHandler } = useAppStateContext();

  const question = useCallback(() => {
    setPopoutHandler({
      header: "Внимание",
      text: `Вы уверены в удалении доски ${children}`,
      actions: [
        {
          title: "Да",
          mode: "destructive",
          autoclose: true,
          action: () => deleteDeskHandler(desk),
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
  }, [children, clearPopoutHandler, deleteDeskHandler, desk, setPopoutHandler]);

  return (
    <Cell expandable after={<Icon24DeleteOutline onClick={question} />} onClick={onDeskClick}>
      {children}
    </Cell>
  );
};

export { DeskItem };
