import { ICard } from "./ICard";

export interface ICardsInitialState {
  loading: boolean;
  list: Array<ICard>;
  error: any;
}
