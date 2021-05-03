import { ICard } from "../../interfaces/ICard";

export interface StateProps {}

export interface DispatchProps {
  removeCard: (card: ICard) => Promise<void>;
}

export interface OwnProps {
  card: ICard;
}
