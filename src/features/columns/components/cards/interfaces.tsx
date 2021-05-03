import { ICard } from "../../interfaces/ICard";

export interface StateProps {
  cards: ICard[];
}

export interface DispatchProps {
  fetchCards: (columnId: string) => void;
  addedCard: (columnId: string, name: string) => Promise<void>;
}

export interface OwnProps {
  columnId: string;
}
