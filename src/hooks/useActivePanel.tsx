import { useCallback, useEffect, useState } from "react";
import { useRoute } from "react-router5";

export const panel = {
  DESKS: "desks",
  COLUMNS: "columns",
};

export const useActivePanel = () => {
  const { route, router } = useRoute();

  const [activePanel, setActivePanel] = useState(route ? (route.name as any) : panel.DESKS);

  useEffect(() => {
    router.subscribe((router) => {
      setActivePanel(router.route.name as any);
    });
  }, [router]);

  const goToColumn = useCallback((deskId: string) => router.navigate(panel.COLUMNS, { deskId }), [
    router,
  ]);

  const goToDesk = useCallback(() => router.navigate(panel.DESKS), [router]);

  return { activePanel, goToColumn, goToDesk };
};
