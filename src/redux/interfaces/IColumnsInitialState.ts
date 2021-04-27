import { IColumns } from "../../Interfaces/IColumns";

export interface IColumnsInitialState {
  loading: boolean;
  list: Array<IColumns>;
  error: any;
}
