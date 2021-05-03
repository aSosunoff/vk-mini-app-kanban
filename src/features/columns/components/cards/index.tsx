import React, { useEffect } from "react";
import { List } from "@vkontakte/vkui";
import { Card } from "../card";
import { CreateForm } from "../../../../components/create-form";
import { fetchCards, addedCard } from "../../actions/cardActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/redux/reducers";
import { ICard } from "../../interfaces/ICard";

interface CardsProps {
  columnId: string;
}

const Cards: React.FC<CardsProps> = ({ columnId }) => {
  const dispatch = useDispatch();

  const cards = useSelector<RootState, ICard[]>(
    ({ columns }) => columns?.column.list[columnId].cards ?? []
  );

  useEffect(() => {
    dispatch(fetchCards(columnId));
  }, [columnId, dispatch]);

  return (
    <>
      <List>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </List>

      <CreateForm
        onSubmit={async (name) => {
          await dispatch(addedCard(columnId, name));
        }}
        buttonName="Создать карточку"
        placeholder="введите название карточки"
      />
    </>
  );
};

export { Cards };
