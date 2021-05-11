import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/reducers";
import { ICard } from "./interfaces/ICard";
import { IColumn } from "./interfaces/IColumns";

export const useColumnsSelectors = () => {
  const columns = useSelector<RootState, IColumn[]>(({ columns }) => {
    let columnsSelector = [] as IColumn[];

    if (columns) {
      columnsSelector = Object.entries(columns.column.list).map(([, { column }]) => column);
    }

    return columnsSelector;
  });

  return columns;
};

export const useCardsSelectors = (columnId: string) => {
  const cards = useSelector<RootState, ICard[]>(
    ({ columns }) => columns?.column.list[columnId].cards ?? []
  );

  return cards;
};

export const useCardSelectors = (columnId: string, cardId: string) => {
  const card = useSelector<RootState, ICard>(
    ({ columns }) =>
      columns?.column.list[columnId]?.cards.find((card) => card.id === cardId) ?? ({} as ICard)
  );

  return card;
};
