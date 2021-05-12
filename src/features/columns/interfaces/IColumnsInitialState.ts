import { ICard } from "./ICard";
import { IColumn } from "./IColumns";

export interface IColumnsInitialState {
  column: {
    loading: boolean;
    list: {
      [columnId: string]: {
        column: IColumn;
        cards: ICard[];
      };
    };
    error: any;
  };
  cards: {
    loading: boolean;
    error: any;
  };
}
