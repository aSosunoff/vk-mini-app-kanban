import { IDesks } from "../../Interfaces/IDesks";

export interface StateProps {}

export interface DispatchProps {
  removeDesk: (desc: IDesks) => Promise<void>;
}

export interface OwnProps {
  desk: IDesks;
  children?: React.ReactNode;
}
