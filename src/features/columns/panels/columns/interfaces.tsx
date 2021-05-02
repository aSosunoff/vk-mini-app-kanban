import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { IDesks } from "../../../desks/interfaces/IDesks";
import { IColumn } from "../../interfaces/IColumns";

export interface StateProps {
  desks: IDesks[];
  columns: IColumn[];
}

export interface DispatchProps {
  fetchColumns: (deskId: string) => void;
  addedColumns: (deskId: string, name: string) => Promise<void>;
}

export interface OwnProps extends Pick<PanelProps, "id"> {}
