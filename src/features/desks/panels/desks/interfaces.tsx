import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { IDesks } from "../../interfaces/IDesks";

export interface StateProps {
  desks: IDesks[];
  loading: boolean;
  error: any;
}

export interface DispatchProps {
  fetchDesks: () => void;
  addedDesk: (name: string) => Promise<void>;
}

export interface OwnProps extends Pick<PanelProps, "id"> {}
