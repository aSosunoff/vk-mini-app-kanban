import { ICard } from "./interfaces/ICard";

export type ActionTypes_Cards = {
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
