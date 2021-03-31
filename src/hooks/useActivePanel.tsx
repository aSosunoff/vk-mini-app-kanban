import { useCallback, useState } from "react";

export const useActivePanel = () => {
  const [activePanel, setActivePanel] = useState<"desks" | "columns">("desks");

  const goToColumn = useCallback(() => setActivePanel(() => "columns"), []);

  const goToDesk = useCallback(() => setActivePanel(() => "desks"), []);

  return { activePanel, goToColumn, goToDesk };
};
