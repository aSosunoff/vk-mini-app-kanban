import { ICard } from "../../cards/interfaces/ICard";
import { IColumn } from "./IColumns";

export interface IColumnsInitialState {
  loading: boolean;
  columns: {
    [columnId: string]: {
      column: IColumn;
      cards: ICard[];
    };
  };
  error: any;
}
