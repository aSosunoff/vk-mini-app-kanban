import React, { createContext, useCallback, useContext, useState } from "react";
import { MODAL_PAGE_EDIT_DESK } from "../components/modal";

type TActiveModal = typeof MODAL_PAGE_EDIT_DESK | null;

interface IModalRootContext {
  activeModal: TActiveModal;
  setActiveModalHandler: (activeModal: TActiveModal) => void;
}

const ModalRootContext = createContext<IModalRootContext>({} as IModalRootContext);

ModalRootContext.displayName = "ModalRootContext";

export const useModalRootContext = () => useContext(ModalRootContext);

export const ModalRootProvider: React.FC = ({ children }) => {
  const [activeModal, setActiveModal] = useState<TActiveModal>(null);

  const setActiveModalHandler = useCallback((activeModal: TActiveModal) => {
    setActiveModal(() => activeModal);
  }, []);

  return (
    <ModalRootContext.Provider value={{ activeModal, setActiveModalHandler }}>
      {children}
    </ModalRootContext.Provider>
  );
};
