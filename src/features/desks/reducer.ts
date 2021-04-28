import produce, { Draft } from "immer";
import { reducer } from "../../redux/handlers";
import { Handlers } from "../../redux/handlers-type";
import { IDeskInitialState } from "./interfaces/IDeskInitialState";
import { ActionTypes_Desk } from "./types";

const initialState: IDeskInitialState = {
  loading: false,
  list: [],
  error: null,
};

const handlers: Handlers<IDeskInitialState, ActionTypes_Desk> = {
  DESK_REQUEST: (draft) => {
    draft.loading = true;
    draft.error = null;
  },
  DESK_SUCCESS: (draft, action) => {
    draft.loading = false;
    draft.error = null;
    draft.list = action.payload;
  },
  DESK_FAILURE: (draft, action) => {
    draft.error = action.payload;
    draft.loading = false;
  },
  DESK_CLEAR_ERROR: (draft) => {
    draft.error = null;
  },
  DESK_ADD: (draft, action) => {
    draft.list.push(action.payload);
  },
  DESK_REMOVE: (draft, action) => {
    const index = draft.list.findIndex(({ id }) => id === action.payload);
    draft.list.splice(index, 1);
  },
  DEFAULT: (draft) => draft,
};

export default produce(
  (state: Draft<IDeskInitialState> = initialState, action: any): IDeskInitialState =>
    reducer(state, action, handlers)
);
