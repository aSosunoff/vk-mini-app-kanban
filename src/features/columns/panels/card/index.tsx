import React from "react";
import { useDispatch } from "react-redux";
import { PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { useSnackbarContext } from "../../../../context/snackbar-context";
/* import styles from "./card.module.css"; */
import { useActivePanel } from "../../../../hooks/useActivePanel";
import { useRoute } from "react-router5";
import { useCardSelectors } from "../../selectors";
import { clearColumns } from "../../actions/columnActions";
import { Markdown } from "../../../../components/markdown";

interface CardProps {}

const Card: React.FC<CardProps> = ({}) => {
  const dispatch = useDispatch();

  const { snackbar } = useSnackbarContext();

  const { goToColumn } = useActivePanel();

  const { route } = useRoute();

  const card = useCardSelectors(route.params.columnId, route.params.cardId);

  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderBack
            onClick={() => {
              dispatch(clearColumns());
              goToColumn(route?.params?.deskId);
            }}
          />
        }
      >
        Карточка - {card?.name}
      </PanelHeader>

      <Markdown>{card.description}</Markdown>

      {snackbar}
    </>
  );
};

export { Card };
