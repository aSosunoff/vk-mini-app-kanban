import { IColumns } from "../../interfaces/IColumns";

export interface StateProps {}

export interface DispatchProps {
  removeColumn: (column: IColumns) => void;
}

export interface OwnProps {
  column: IColumns;
  children?: React.ReactNode;
}
