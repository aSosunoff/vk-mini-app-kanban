import { IDesks } from "./interfaces/IDesks";

export type ActionTypes_Desk = {
  DESK_REQUEST: void;
  DESK_SUCCESS: { payload: IDesks[] };
  DESK_FAILURE: { payload: any };
  DESK_ADD: { payload: IDesks };
  DESK_REMOVE: { payload: string };
  DESK_CLEAR_ERROR: void;
};
