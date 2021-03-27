import React from "react";
import { Panel, PanelHeaderSimple } from "@vkontakte/vkui";
import { DeskList } from "./DeskList";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { DeskCreate } from "./DeskCreate";

interface DesksProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
}

const Desks: React.FC<DesksProps> = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <DeskCreate />

      <DeskList />

      {/* <div>Панель с досками</div>
      <Button onClick={onChangePanel}>Перейти к колонкам</Button> */}
    </Panel>
  );
};

export { Desks };
