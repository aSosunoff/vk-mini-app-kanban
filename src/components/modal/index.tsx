import { ModalRoot } from "@vkontakte/vkui";
import React from "react";
import { useModalRootContext } from "../../context/modal-root-context";
import { ModalDeskAdd } from "./modal-desk-add";
import { ModalColumnAdd } from "./modal-column-add";
import { ModalCardAdd } from "./modal-card-add";

export const MODAL_PAGE_ADD_DESK = "add_desk";
export const MODAL_PAGE_ADD_COLUMN = "add_column";
export const MODAL_PAGE_ADD_CARD = "add_card";

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

      <ModalCardAdd
        id={MODAL_PAGE_ADD_CARD}
        onClose={() => setActiveModalHandler(null)}
      ></ModalCardAdd>
    </ModalRoot>
  );
};
