import produce, { Draft } from "immer";
import { reducer } from "../../app/redux/handlers";
import { Handlers } from "../../app/redux/handlers-type";
import { IColumnsInitialState } from "./interfaces/IColumnsInitialState";
import { ActionTypes_Columns } from "./types";

const initialState: IColumnsInitialState = {
  loading: false,
  columns: {},
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
    draft.columns = action.payload.reduce(
      (result, column) => ({
        ...result,
        [column.id]: { column, cards: [] },
      }),
      {}
    );
  },
  COLUMNS_FAILURE: (draft, action) => {
    draft.error = action.payload;
    draft.loading = false;
  },
  COLUMNS_CLEAR_ERROR: (draft) => {
    draft.error = null;
  },
  COLUMNS_ADD: (draft, action) => {
    draft.columns[action.payload.id] = {
      column: action.payload,
      cards: [],
    };
  },
  COLUMNS_REMOVE: (draft, action) => {
    delete draft.columns[action.payload];
  },
  DEFAULT: (draft) => draft,
};

export default produce(
  (state: Draft<IColumnsInitialState> = initialState, action: any): IColumnsInitialState =>
    reducer(state, action, handlers)
);
