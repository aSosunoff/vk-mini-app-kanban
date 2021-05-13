import { Button, FormItem, FormLayout, FormLayoutGroup, Input, ModalCard } from "@vkontakte/vkui";
import React from "react";
import { ModalBaseProps } from "./interfaces";

interface ModalDeskAddProps extends ModalBaseProps {}

export const ModalDeskAdd: React.FC<ModalDeskAddProps> = ({ id, onClose }) => {
  return (
    <ModalCard
      id={id}
      onClose={onClose}
      /* icon={<Icon56MoneyTransferOutline />} */
      header="Создать новую доску"
      subheader="Доски необходимы для того, что бы обьеденить какую либо деятельность для гибкого управления задачами"
    >
      <FormLayout /* onSubmit={createHandler} */>
        <FormItem
        /* status={handlers.name.error && handlers.name.touched ? "error" : "valid"} */
        /* bottom={
              handlers.name.error && handlers.name.touched ? handlers.name.error.errorMessage : ""
            } */
        >
          <Input
            autoFocus
            /* value={handlers.name.value} */
            /* onChange={handlers.name.onChange} */
            placeholder="введите название доски"
          />
        </FormItem>

        <FormLayoutGroup mode="horizontal">
          <FormItem>
            <Button size="l" stretched /* onClick={createHandler} */>
              Создать
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </FormLayout>
    </ModalCard>
  );
};
