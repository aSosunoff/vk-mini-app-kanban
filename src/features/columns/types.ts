import { ICard } from "./interfaces/ICard";
import { IColumn } from "./interfaces/IColumns";

export type ActionTypes_Columns = {
  COLUMNS_REQUEST: void;
  COLUMNS_SUCCESS: { payload: IColumn[] };
  COLUMNS_FAILURE: { payload: any };
  COLUMNS_ADD: { payload: IColumn };
  COLUMNS_REMOVE: { payload: string };
  COLUMNS_CLEAR_ERROR: void;
  COLUMNS_CLEAR: void;

  CARDS_REQUEST: void;
  CARDS_SUCCESS: {
    payload: {
      columnId: string;
      cards: ICard[];
    };
  };
  CARDS_FAILURE: { payload: any };
  CARDS_ADD: {
    payload: {
      columnId: string;
      card: ICard;
    };
  };
  CARDS_REMOVE: { payload: ICard };
  CARDS_CLEAR_ERROR: void;
};
