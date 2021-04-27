import { IColumns } from "../../Interfaces/IColumns";

export interface StateProps {}

export interface DispatchProps {
  removeColumn: (column: IColumns) => void;
}

export interface OwnProps {
  column: IColumns;
  children?: React.ReactNode;
}
