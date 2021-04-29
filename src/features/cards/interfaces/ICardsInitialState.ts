import { ICard } from "./ICard";

export interface ICardsInitialState {
  loading: boolean;
  columns: {
    [columnId: string]: ICard[];
  };
  error: any;
}
