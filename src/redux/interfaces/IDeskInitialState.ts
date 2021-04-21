import { IDesks } from "../../Interfaces/IDesks";

export interface IDeskInitialState {
  loading: boolean;
  list: Array<IDesks>;
  error: any;
}
