import { ActionSheet } from "@vkontakte/vkui";
import { ActionSheetProps } from "@vkontakte/vkui/dist/components/ActionSheet/ActionSheet";
import { ViewProps } from "@vkontakte/vkui/dist/components/View/View";
import React, { createContext, useCallback, useContext, useState } from "react";

interface IActionSheetContext extends Pick<ViewProps, "popout"> {
  setActionSheetHandler: (props: ActionSheetProps) => void;
  clearActionSheetHandler: () => void;
}

const ActionSheetContext = createContext<IActionSheetContext>({} as IActionSheetContext);

ActionSheetContext.displayName = "ActionSheetContext";

export const useActionSheetContext = () => useContext(ActionSheetContext);

export const ActionSheetProvider: React.FC = ({ children }) => {
  const [popout, setPopout] = useState<React.ReactNode>();

  const setActionSheetHandler = useCallback((props: ActionSheetProps) => {
    setPopout(() => <ActionSheet {...props} />);
  }, []);

  const clearActionSheetHandler = useCallback(() => setPopout(() => null), []);

  return (
    <ActionSheetContext.Provider
      value={{
        popout,
        setActionSheetHandler,
        clearActionSheetHandler,
      }}
    >
      {children}
    </ActionSheetContext.Provider>
  );
};
