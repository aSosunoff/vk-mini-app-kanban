import { IColumns } from "./IColumns";

export interface IColumnsInitialState {
  loading: boolean;
  columns: Array<IColumns>;
  error: any;
}
