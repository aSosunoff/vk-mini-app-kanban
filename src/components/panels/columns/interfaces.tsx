import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { IDesks } from "../../../Interfaces/IDesks";

export interface StateProps {
  desks: IDesks[];
}

export interface DispatchProps {}

export interface OwnProps extends Pick<PanelProps, "id"> {}
