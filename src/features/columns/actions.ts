import { Dispatch } from "redux";
import { createColumn, getColumns, deleteColumn } from "../../api/columnsApi";
import { IColumn } from "./interfaces/IColumns";
import { GetType } from "../../app/redux/handlers-type";
import { ActionTypes_Columns } from "./types";

const success = (payload: IColumn[]): GetType<ActionTypes_Columns, "COLUMNS_SUCCESS"> => {
  return {
    type: "COLUMNS_SUCCESS",
    payload,
  };
};

const request = (): GetType<ActionTypes_Columns, "COLUMNS_REQUEST"> => {
  return {
    type: "COLUMNS_REQUEST",
  };
};

const falure = (payload: any): GetType<ActionTypes_Columns, "COLUMNS_FAILURE"> => {
  return {
    type: "COLUMNS_FAILURE",
    payload,
  };
};

const create = (payload: IColumn): GetType<ActionTypes_Columns, "COLUMNS_ADD"> => {
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
};

export const fetchColumns = (deskId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    const columns = await getColumns(deskId);

    dispatch(success(columns));
  } catch (error) {
    dispatch(falure(error));
  }
};

export const addedColumns = (deskId: string, name: string) => async (dispatch: Dispatch) => {
  try {
    const column = await createColumn(deskId, name);

    dispatch(create(column));
  } catch (error) {
    dispatch(falure(error));
  }
};

export const removeColumn = (desk: IColumn) => async (dispatch: Dispatch) => {
  try {
    await deleteColumn(desk.id);

    dispatch(remove(desk.id));
  } catch (error) {
    dispatch(falure(error));
  }
};
