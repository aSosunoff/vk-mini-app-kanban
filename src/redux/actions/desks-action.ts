import { Dispatch } from "redux";
import { createDesk, deleteDesk, getDesks } from "../../components/actions";
import { IDesks } from "../../Interfaces/IDesks";
import { GetType } from "../handlers-type";
import { ActionTypes_Desk } from "../types";

const success = (payload: IDesks[]): GetType<ActionTypes_Desk, "DESK_SUCCESS"> => {
  return {
    type: "DESK_SUCCESS",
    payload,
  };
};

const request = (): GetType<ActionTypes_Desk, "DESK_REQUEST"> => {
  return {
    type: "DESK_REQUEST",
  };
};

const falure = (payload: any): GetType<ActionTypes_Desk, "DESK_FAILURE"> => {
  return {
    type: "DESK_FAILURE",
    payload,
  };
};

const create = (payload: IDesks): GetType<ActionTypes_Desk, "DESK_ADD"> => {
  return {
    type: "DESK_ADD",
    payload,
  };
};

const remove = (payload: string): GetType<ActionTypes_Desk, "DESK_REMOVE"> => {
  return {
    type: "DESK_REMOVE",
    payload,
  };
};

export const fetchDesks = () => async (dispatch: Dispatch) => {
  try {
    dispatch(request());

    const desks = await getDesks();

    dispatch(success(desks));
  } catch (error) {
    dispatch(falure(error));
  }
};

export const addedDesk = (name: string) => async (dispatch: Dispatch) => {
  try {
    const desk = await createDesk(name);

    dispatch(create(desk));
  } catch (error) {
    dispatch(falure(error));
  }
};

export const removeDesk = (desk: IDesks) => async (dispatch: Dispatch) => {
  try {
    await deleteDesk(desk.id);

    dispatch(remove(desk.id));
  } catch (error) {
    dispatch(falure(error));
  }
};
