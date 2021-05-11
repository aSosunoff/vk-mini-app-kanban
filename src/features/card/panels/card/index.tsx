import React from "react";
import { PanelHeader, PanelHeaderBack } from "@vkontakte/vkui";

import { useSnackbarContext } from "../../../../context/snackbar-context";
import styles from "./card.module.css";
import { useActivePanel } from "../../../../hooks/useActivePanel";
import { useRoute } from "react-router5";
import { useCardSelectors } from "../../../columns/selectors";

interface CardProps {}

const Card: React.FC<CardProps> = ({}) => {
  const { snackbar } = useSnackbarContext();

  const { goToColumn } = useActivePanel();

  const { route } = useRoute();

  const card = useCardSelectors(route.params.columnId, route.params.cardId);

  /* const activeDesk = useMemo(() => desks.find(({ id }) => id === route?.params?.deskId), [
    desks,
    route?.params?.deskId,
  ]); */

  /* useEffect(() => {
    if (route.params.deskId) {
      fetchColumns(route.params.deskId);
    }
  }, [route.params.deskId, fetchColumns]);

  const createColumn = useCallback(
    async (name: string) => {
      if (route?.params?.deskId) {
        await addedColumns(route?.params?.deskId, name);
      }
    },
    [addedColumns, route?.params?.deskId]
  ); */

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={() => goToColumn(route?.params?.deskId)} />}>
        Карточка - {card?.name}
      </PanelHeader>

      {snackbar}
    </>
  );
};

export { Card };