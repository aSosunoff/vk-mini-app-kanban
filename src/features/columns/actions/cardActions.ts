import { Dispatch } from "redux";
import { createCard, deleteCard, getCards } from "../../../api/cardsApi";
import { ICard } from "../interfaces/ICard";
import { GetType } from "../../../app/redux/handlers-type";
import { ActionTypes_Columns } from "../types";

const success = (
  columnId: string,
  cards: ICard[]
): GetType<ActionTypes_Columns, "CARDS_SUCCESS"> => {
  return {
    type: "CARDS_SUCCESS",
    payload: {
      columnId,
      cards,
    },
  };
};

const request = (): GetType<ActionTypes_Columns, "CARDS_REQUEST"> => {
  return {
    type: "CARDS_REQUEST",
  };
};

const falure = (payload: any): GetType<ActionTypes_Columns, "CARDS_FAILURE"> => {
  return {
    type: "CARDS_FAILURE",
    payload,
  };
};

const create = (columnId: string, card: ICard): GetType<ActionTypes_Columns, "CARDS_ADD"> => {
  return {
    type: "CARDS_ADD",
    payload: {
      columnId,
      card,
    },
  };
};

const remove = (payload: ICard): GetType<ActionTypes_Columns, "CARDS_REMOVE"> => {
  return {
    type: "CARDS_REMOVE",
    payload,
  };
};

export const fetchCards = (columnId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    const columns = await getCards(columnId);

    dispatch(success(columnId, columns));
  } catch (error) {
    dispatch(falure(error));
  }
};

export const addedCard = (columnId: string, name: string) => async (dispatch: Dispatch) => {
  try {
    const card = await createCard(columnId, name);

    dispatch(create(columnId, card));
  } catch (error) {
    dispatch(falure(error));
  }
};

export const removeCard = (card: ICard) => async (dispatch: Dispatch) => {
  try {
    await deleteCard(card.id);

    dispatch(remove(card));
  } catch (error) {
    dispatch(falure(error));
  }
};
