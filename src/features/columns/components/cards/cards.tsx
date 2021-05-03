import React, { useEffect } from "react";
import { List } from "@vkontakte/vkui";
import { Card } from "../card";
import { CreateForm } from "../../../../components/create-form";
import * as I from "./interfaces";

const Cards: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({
  fetchCards,
  addedCard,
  removeCard,
  columnId,
  cards,
}) => {
  useEffect(() => {
    fetchCards(columnId);
  }, [columnId, fetchCards]);

  return (
    <>
      <List>
        {cards.map((card) => (
          <Card key={card.id} onDelete={() => removeCard(card)}>
            {card.name}
          </Card>
        ))}
      </List>

      <CreateForm
        onSubmit={(name) => addedCard(columnId, name)}
        buttonName="Создать карточку"
        placeholder="введите название карточки"
      />
    </>
  );
};

export { Cards };
