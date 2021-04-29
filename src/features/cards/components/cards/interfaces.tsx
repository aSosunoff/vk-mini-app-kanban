import { ICard } from "../../interfaces/ICard";

export interface StateProps {
  cards: ICard[];
}

export interface DispatchProps {
  fetchCards: (columnId: string) => void;
}

export interface OwnProps {
  columnId: string;
}
