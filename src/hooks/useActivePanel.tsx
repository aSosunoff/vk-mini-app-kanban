import { useCallback, useEffect, useState } from "react";
import { useRoute } from "react-router5";

export const panel = {
  DESKS: "desks",
  COLUMNS: "columns",
};

export const useActivePanel = () => {
  const { router } = useRoute();

  const goToColumn = useCallback((deskId: string) => router.navigate(panel.COLUMNS, { deskId }), [
    router,
  ]);

  const goToDesk = useCallback(() => router.navigate(panel.DESKS), [router]);

  return { goToColumn, goToDesk };
};
