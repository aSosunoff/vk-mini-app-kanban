import React from "react";
import { List } from "@vkontakte/vkui";
import { Card } from "../card";
import { CreateForm } from "../create-form";
import { useCards } from "../../hooks/useCards";

interface CardsProps {
  columnId: string;
}

const Cards: React.FC<CardsProps> = ({ columnId }) => {
  const { cards, createHandler, deleteHandler } = useCards(columnId);
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
