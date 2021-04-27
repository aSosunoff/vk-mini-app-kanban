import produce, { Draft } from "immer";
import { reducer } from "../handlers";
import { Handlers } from "../handlers-type";
import { IColumnsInitialState } from "../interfaces/IColumnsInitialState";
import { ActionTypes_Columns } from "../types";

const initialState: IColumnsInitialState = {
  loading: false,
  list: [],
  error: null,
};

const handlers: Handlers<IColumnsInitialState, ActionTypes_Columns> = {
  COLUMNS_REQUEST: (draft) => {
    draft.loading = true;
    draft.error = null;
  },
  COLUMNS_SUCCESS: (draft, action) => {
    draft.loading = false;
    draft.error = null;
    draft.list = action.payload;
  },
  COLUMNS_FAILURE: (draft, action) => {
    draft.error = action.payload;
    draft.loading = false;
  },
  COLUMNS_CLEAR_ERROR: (draft) => {
    draft.error = null;
  },
  COLUMNS_ADD: (draft, action) => {
    draft.list.push(action.payload);
  },
  COLUMNS_REMOVE: (draft, action) => {
    const index = draft.list.findIndex(({ id }) => id === action.payload);
    draft.list.splice(index, 1);
  },
  DEFAULT: (draft) => draft,
};

export default produce(
  (state: Draft<IColumnsInitialState> = initialState, action: any): IColumnsInitialState =>
    reducer(state, action, handlers)
);
