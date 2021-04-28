import { IDesks } from "../../../../features/desks/interfaces/IDesks";

export interface StateProps {}

export interface DispatchProps {
  removeDesk: (desc: IDesks) => Promise<void>;
}

export interface OwnProps {
  desk: IDesks;
  children?: React.ReactNode;
}
