import { IColumn } from "./interfaces/IColumns";

export type ActionTypes_Columns = {
  COLUMNS_REQUEST: void;
  COLUMNS_SUCCESS: { payload: IColumn[] };
  COLUMNS_FAILURE: { payload: any };
  COLUMNS_ADD: { payload: IColumn };
  COLUMNS_REMOVE: { payload: string };
  COLUMNS_CLEAR_ERROR: void;
};
