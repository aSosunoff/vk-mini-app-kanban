import React, { useEffect } from "react";
import { Button, Div, List } from "@vkontakte/vkui";
import { Card } from "../card";
import { fetchCards } from "../../actions/cardActions";
import { useDispatch } from "react-redux";
import { useCardsSelectors } from "../../selectors";
import { useModalRootContext } from "../../../../context/modal-root-context";

interface CardsProps {
  columnId: string;
}

const Cards: React.FC<CardsProps> = ({ columnId }) => {
  const dispatch = useDispatch();

  const cards = useCardsSelectors(columnId);

  useEffect(() => {
    dispatch(fetchCards(columnId));
  }, [columnId, dispatch]);

  const { setActiveModalHandler } = useModalRootContext();

  return (
    <>
      <List>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </List>

      <Div>
        <Button
          size="l"
          stretched
          onClick={() => setActiveModalHandler("add_card", { columnId })}
          mode="outline"
        >
          Создать карточку
        </Button>
      </Div>
    </>
  );
};

export { Cards };
