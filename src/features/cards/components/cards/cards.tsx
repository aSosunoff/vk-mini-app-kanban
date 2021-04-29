import React, { useEffect } from "react";
import { List } from "@vkontakte/vkui";
import { Card } from "../card";
import { CreateForm } from "../../../../components/create-form";
import { useCardsState } from "../../hooks/useCardsState";
import * as I from "./interfaces";

const Cards: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({
  fetchCards,
  columnId,
  cards,
}) => {
  /* const { cards, createHandler, deleteHandler } = useCardsState(columnId); */

  useEffect(() => {
    fetchCards(columnId);
  }, [columnId, fetchCards]);

  return (
    <>
      <List>
        {cards.map((card) => (
          <Card key={card.id} onDelete={() => /* deleteHandler(card) */ Promise.resolve()}>
            {card.name}
          </Card>
        ))}
      </List>

      <CreateForm
        onSubmit={() => /* createHandler */ Promise.resolve()}
        buttonName="Создать карточку"
        placeholder="введите название карточки"
      />
    </>
  );
};

export { Cards };
