import React from "react";
import PropsTypes from "prop-types";
import { Panel, CardGrid, PanelHeaderSimple } from "@vkontakte/vkui";
import { DeskItem } from "./DeskItem";
import { DeskList } from "./DeskList";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";

interface DesksProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
}

const Desks: React.FC<DesksProps> = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <DeskList />

      {/* <div>Панель с досками</div>
      <Button onClick={onChangePanel}>Перейти к колонкам</Button> */}
    </Panel>
  );
};

export { Desks };
