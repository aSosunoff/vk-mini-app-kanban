import { IDesks } from "../Interfaces/IDesks";

export type ActionTypes_Desk = {
  DESK_REQUEST: void;
  DESK_SUCCESS: { payload: IDesks[] };
  DESK_FAILURE: { payload: any };
  DESK_CLEAR_ERROR: void;
};
