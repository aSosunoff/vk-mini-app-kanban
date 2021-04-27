import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { IColumns } from "../../../Interfaces/IColumns";
import { IDesks } from "../../../Interfaces/IDesks";

export interface StateProps {
  desks: IDesks[];
  columns: IColumns[];
}

export interface DispatchProps {
  fetchColumns: (deskId: string) => void;
  addedColumns: (deskId: string, name: string) => Promise<void>;
}

export interface OwnProps extends Pick<PanelProps, "id"> {}
