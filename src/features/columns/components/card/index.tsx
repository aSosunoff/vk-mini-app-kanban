import React, { useCallback, useRef } from "react";
import { ActionSheetItem, Cell } from "@vkontakte/vkui";
import { useAlertContext } from "../../../../context/alert-context";
import { ICard } from "../../interfaces/ICard";
import { removeCard } from "../../actions/cardActions";
import { useDispatch } from "react-redux";
import { Icon24DeleteOutline } from "@vkontakte/icons";
import { useActivePanel } from "../../../../hooks/useActivePanel";
import { useRoute } from "react-router5";
import { useActionSheetContext } from "../../../../context/action-sheet-context";

interface CardProps {
  card: ICard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const dispatch = useDispatch();

  const { goToCard } = useActivePanel();

  const { route } = useRoute();

  const subtitleTargetRef = useRef<HTMLDivElement>(null);

  const { setActionSheetHandler, clearActionSheetHandler } = useActionSheetContext();

  const question = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.stopPropagation();

      setActionSheetHandler({
        header: `Вы уверены в удалении карточки ${card.name}`,
        onClose: clearActionSheetHandler,
        iosCloseItem: (
          <ActionSheetItem autoclose mode="cancel">
            Отменить
          </ActionSheetItem>
        ),
        children: (
          <ActionSheetItem autoclose mode="destructive" onClick={() => dispatch(removeCard(card))}>
            Удалить
          </ActionSheetItem>
        ),
        toggleRef: subtitleTargetRef.current as Element,
      });
    },
    [setActionSheetHandler, card, clearActionSheetHandler, dispatch]
  );

  return (
    <Cell
      after={<Icon24DeleteOutline onClick={question} getRootRef={subtitleTargetRef} />}
      onClick={() => goToCard(route?.params?.deskId, card.columnId, card.id)}
    >
      {card.name}
    </Cell>
  );
};

export { Card };
