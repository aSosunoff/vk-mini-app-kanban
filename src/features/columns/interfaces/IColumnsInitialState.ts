import { IColumns } from "./IColumns";

export interface IColumnsInitialState {
  loading: boolean;
  list: Array<IColumns>;
  error: any;
}
