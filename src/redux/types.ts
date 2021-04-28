import { IColumns } from "../Interfaces/IColumns";

export type ActionTypes_Columns = {
  COLUMNS_REQUEST: void;
  COLUMNS_SUCCESS: { payload: IColumns[] };
  COLUMNS_FAILURE: { payload: any };
  COLUMNS_ADD: { payload: IColumns };
  COLUMNS_REMOVE: { payload: string };
  COLUMNS_CLEAR_ERROR: void;
};
