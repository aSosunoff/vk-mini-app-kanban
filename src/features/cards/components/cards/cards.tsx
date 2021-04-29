import React from "react";
import { List } from "@vkontakte/vkui";
import { Card } from "../card";
import { CreateForm } from "../../../../components/create-form";
import { useCardsState } from "../../hooks/useCardsState";
import * as I from "./interfaces";

const Cards: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({ columnId }) => {
  const { cards, createHandler, deleteHandler } = useCardsState(columnId);

  return (
    <>
      <List>
        {cards.map((card) => (
          <Card key={card.id} onDelete={() => deleteHandler(card)}>
            {card.name}
          </Card>
        ))}
      </List>

      <CreateForm
        onSubmit={createHandler}
        buttonName="Создать карточку"
        placeholder="введите название карточки"
      />
    </>
  );
};

export { Cards };
