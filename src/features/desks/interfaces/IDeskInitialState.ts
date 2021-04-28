import { IDesks } from "../interfaces/IDesks";

export interface IDeskInitialState {
  loading: boolean;
  list: Array<IDesks>;
  error: any;
}
