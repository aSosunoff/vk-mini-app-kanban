import { useCallback } from "react";
import { useRoute } from "react-router5";

export const panel = {
  DESKS: "desks",
  COLUMNS: "columns",
  CARD: "card",
};

export const useActivePanel = () => {
  const { router } = useRoute();

  const goToColumn = useCallback((deskId: string) => router.navigate(panel.COLUMNS, { deskId }), [
    router,
  ]);

  const goToCard = useCallback(
    (deskId: string, columnId: string, cardId: string) =>
      router.navigate(panel.CARD, { deskId, columnId, cardId }),
    [router]
  );

  const goToDesk = useCallback(() => router.navigate(panel.DESKS), [router]);

  return { goToColumn, goToDesk, goToCard };
};
