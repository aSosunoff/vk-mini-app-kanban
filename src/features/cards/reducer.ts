import produce, { Draft } from "immer";
import { reducer } from "../../app/redux/handlers";
import { Handlers } from "../../app/redux/handlers-type";
import { ICardsInitialState } from "./interfaces/ICardsInitialState";
import { ActionTypes_Cards } from "./types";

const initialState: ICardsInitialState = {
  loading: false,
  list: [],
  error: null,
};

const handlers: Handlers<ICardsInitialState, ActionTypes_Cards> = {
  CARDS_REQUEST: (draft) => {
    draft.loading = true;
    draft.error = null;
  },
  CARDS_SUCCESS: (draft, action) => {
    draft.loading = false;
    draft.error = null;
    draft.list = action.payload;
  },
  CARDS_FAILURE: (draft, action) => {
    draft.error = action.payload;
    draft.loading = false;
  },
  CARDS_CLEAR_ERROR: (draft) => {
    draft.error = null;
  },
  CARDS_ADD: (draft, action) => {
    draft.list.push(action.payload);
  },
  CARDS_REMOVE: (draft, action) => {
    const index = draft.list.findIndex(({ id }) => id === action.payload);
    draft.list.splice(index, 1);
  },
  DEFAULT: (draft) => draft,
};

export default produce(
  (state: Draft<ICardsInitialState> = initialState, action: any): ICardsInitialState =>
    reducer(state, action, handlers)
);
