import { ModalRoot } from "@vkontakte/vkui";
import React from "react";
import { useModalRootContext } from "../../context/modal-root-context";
import { ModalDeskAdd } from "./modal-desk-add";
import { ModalColumnAdd } from "./modal-column-add";

export const MODAL_PAGE_ADD_DESK = "add_desk";
export const MODAL_PAGE_ADD_COLUMN = "add_column";

export const Modal: React.FC = () => {
  const { activeModal, setActiveModalHandler } = useModalRootContext();

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalDeskAdd
        id={MODAL_PAGE_ADD_DESK}
        onClose={() => setActiveModalHandler(null)}
      ></ModalDeskAdd>

      <ModalColumnAdd
        id={MODAL_PAGE_ADD_COLUMN}
        onClose={() => setActiveModalHandler(null)}
      ></ModalColumnAdd>
    </ModalRoot>
  );
};
