import produce, { Draft } from "immer";
import { reducer } from "../../app/redux/handlers";
import { Handlers } from "../../app/redux/handlers-type";
import { IColumnsInitialState } from "./interfaces/IColumnsInitialState";
import { ActionTypes_Columns } from "./types";

const initialState: IColumnsInitialState = {
  column: {
    loading: false,
    list: {},
    error: null,
  },
  cards: { loading: false, error: null },
};

const handlers: Handlers<IColumnsInitialState, ActionTypes_Columns> = {
  //#region fetch column
  COLUMNS_REQUEST: (draft) => {
    draft.column.loading = true;
    draft.column.error = null;
  },
  COLUMNS_SUCCESS: (draft, action) => {
    draft.column.loading = false;
    draft.column.error = null;
    draft.column.list = action.payload.reduce(
      (result, column) => ({
        ...result,
        [column.id]: { column, cards: [] },
      }),
      {}
    );
  },
  COLUMNS_FAILURE: (draft, action) => {
    draft.column.error = action.payload;
    draft.column.loading = false;
  },

  COLUMNS_CLEAR_ERROR: (draft) => {
    draft.column.error = null;
  },
  COLUMNS_ADD: (draft, action) => {
    draft.column.list[action.payload.id] = {
      column: action.payload,
      cards: [],
    };
  },
  COLUMNS_REMOVE: (draft, action) => {
    delete draft.column.list[action.payload];
  },
  COLUMNS_CLEAR: (draft) => {
    draft.column.list = initialState.column.list;
  },
  //#endregion

  //#region cards
  CARDS_REQUEST: (draft) => {
    draft.cards.loading = true;
    draft.cards.error = null;
  },
  CARDS_SUCCESS: (draft, { payload: { columnId, cards } }) => {
    draft.cards.loading = false;
    draft.cards.error = null;
    draft.column.list[columnId].cards = cards;
  },
  CARDS_FAILURE: (draft, action) => {
    draft.cards.error = action.payload;
    draft.cards.loading = false;
  },
  CARDS_CLEAR_ERROR: (draft) => {
    draft.cards.error = null;
  },
  CARDS_ADD: (draft, { payload: { columnId, card } }) => {
    draft.column.list[columnId].cards.push(card);
  },
  CARDS_REMOVE: (draft, { payload: { columnId, id: deleteId } }) => {
    draft.column.list[columnId];
    const index = draft.column.list[columnId].cards.findIndex(({ id }) => id === deleteId);
    draft.column.list[columnId].cards.splice(index, 1);
  },
  //#endregion
  DEFAULT: (draft) => draft,
};

export default produce(
  (state: Draft<IColumnsInitialState>, action: any): IColumnsInitialState =>
    reducer(state, action, handlers),
  initialState
);
