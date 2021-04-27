import { IColumns } from "../Interfaces/IColumns";
import { IDesks } from "../Interfaces/IDesks";

export type ActionTypes_Desk = {
  DESK_REQUEST: void;
  DESK_SUCCESS: { payload: IDesks[] };
  DESK_FAILURE: { payload: any };
  DESK_ADD: { payload: IDesks };
  DESK_REMOVE: { payload: string };
  DESK_CLEAR_ERROR: void;
};

export type ActionTypes_Columns = {
  COLUMNS_REQUEST: void;
  COLUMNS_SUCCESS: { payload: IColumns[] };
  COLUMNS_FAILURE: { payload: any };
  COLUMNS_ADD: { payload: IColumns };
  COLUMNS_REMOVE: { payload: string };
  COLUMNS_CLEAR_ERROR: void;
};
