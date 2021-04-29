import { Dispatch } from "redux";
import { getCards } from "../../api/cardsApi";
import { ICard } from "./interfaces/ICard";
import { GetType } from "../../app/redux/handlers-type";
import { ActionTypes_Cards } from "./types";

const success = (columnId: string, cards: ICard[]): GetType<ActionTypes_Cards, "CARDS_SUCCESS"> => {
  return {
    type: "CARDS_SUCCESS",
    payload: {
      columnId,
      cards,
    },
  };
};

const request = (): GetType<ActionTypes_Cards, "CARDS_REQUEST"> => {
  return {
    type: "CARDS_REQUEST",
  };
};

const falure = (payload: any): GetType<ActionTypes_Cards, "CARDS_FAILURE"> => {
  return {
    type: "CARDS_FAILURE",
    payload,
  };
};

/* const create = (payload: IColumns): GetType<ActionTypes_Columns, "COLUMNS_ADD"> => {
  return {
    type: "COLUMNS_ADD",
    payload,
  };
};

const remove = (payload: string): GetType<ActionTypes_Columns, "COLUMNS_REMOVE"> => {
  return {
    type: "COLUMNS_REMOVE",
    payload,
  };
}; */

export const fetchCards = (columnId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    const columns = await getCards(columnId);

    dispatch(success(columnId, columns));
  } catch (error) {
    dispatch(falure(error));
  }
};

/* export const addedColumns = (deskId: string, name: string) => async (dispatch: Dispatch) => {
  try {
    const column = await createColumn(deskId, name);

    dispatch(create(column));
  } catch (error) {
    dispatch(falure(error));
  }
};

export const removeColumn = (desk: IColumns) => async (dispatch: Dispatch) => {
  try {
    await deleteColumn(desk.id);

    dispatch(remove(desk.id));
  } catch (error) {
    dispatch(falure(error));
  }
}; */
