import React, { createContext, useCallback, useContext, useState } from "react";
import {
  MODAL_PAGE_ADD_DESK,
  MODAL_PAGE_ADD_COLUMN,
  MODAL_PAGE_ADD_CARD,
} from "../components/modal";

type TActiveModal =
  | typeof MODAL_PAGE_ADD_DESK
  | typeof MODAL_PAGE_ADD_COLUMN
  | typeof MODAL_PAGE_ADD_CARD
  | null;

interface IModalRootContext {
  activeModal: TActiveModal;
  setActiveModalHandler: (activeModal: TActiveModal, props?: Record<string, any>) => void;
  getProp: (propName: string) => any;
}

const ModalRootContext = createContext<IModalRootContext>({} as IModalRootContext);

ModalRootContext.displayName = "ModalRootContext";

export const useModalRootContext = () => useContext(ModalRootContext);

export const ModalRootProvider: React.FC = ({ children }) => {
  const [activeModal, setActiveModal] = useState<TActiveModal>(null);

  const [props, setProps] = useState<Record<string, any> | null>({});

  const setActiveModalHandler = useCallback(
    (activeModal: TActiveModal, props: Record<string, any> = {}) => {
      setActiveModal(() => activeModal);
      setProps(() => props);
    },
    []
  );

  const getProp = useCallback(
    (propName: string) => (props && propName in props ? props[propName] : null),
    [props]
  );

  return (
    <ModalRootContext.Provider value={{ activeModal, getProp, setActiveModalHandler }}>
      {children}
    </ModalRootContext.Provider>
  );
};
