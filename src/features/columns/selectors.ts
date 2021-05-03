import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/reducers";
import { ICard } from "./interfaces/ICard";

export const useCardsSelectors = (columnId: string) => {
  const cards = useSelector<RootState, ICard[]>(
    ({ columns }) => columns?.column.list[columnId].cards ?? []
  );

  return cards;
};
