import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { Div, PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { useSnackbarContext } from "../../../../context/snackbar-context";
/* import styles from "./card.module.css"; */
import { useActivePanel } from "../../../../hooks/useActivePanel";
import { useRoute } from "react-router5";
import { useCardSelectors } from "../../selectors";
import { clearColumns } from "../../actions/columnActions";
import { ICard } from "../../interfaces/ICard";

/*  */
const Markdown: React.FC<{ children: string }> = ({ children }) => {
  const mark = useMemo(() => (children ? children.replace(/\\n/g, "\n") : ""), [children]);

  return <Div>{mark}</Div>;
};
/*  */

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
