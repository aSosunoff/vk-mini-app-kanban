import { ModalRoot } from "@vkontakte/vkui";
import React from "react";
import { useModalRootContext } from "../../context/modal-root-context";
import { ModalDeskAdd } from "./modal-desk-add";

export const MODAL_PAGE_EDIT_DESK = "edit_desk";

export const Modal: React.FC = () => {
  const { activeModal, setActiveModalHandler } = useModalRootContext();

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalDeskAdd
        id={MODAL_PAGE_EDIT_DESK}
        onClose={() => setActiveModalHandler(null)}
      ></ModalDeskAdd>
    </ModalRoot>
  );
};
