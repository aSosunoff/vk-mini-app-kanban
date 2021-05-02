import { IColumn } from "../../interfaces/IColumns";

export interface StateProps {}

export interface DispatchProps {
  removeColumn: (column: IColumn) => void;
}

export interface OwnProps {
  column: IColumn;
  children?: React.ReactNode;
}
