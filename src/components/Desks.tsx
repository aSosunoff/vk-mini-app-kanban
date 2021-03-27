import React from "react";
import { Panel, Button, Div, PanelHeaderSimple } from "@vkontakte/vkui";
import { DeskList } from "./DeskList";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { Icon24Add } from "@vkontakte/icons";

interface DesksProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
}

const Desks: React.FC<DesksProps> = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <Div>
        <Button size="l" stretched before={<Icon24Add />}>
          Создать доску
        </Button>
      </Div>

      <DeskList />

      {/* <div>Панель с досками</div>
      <Button onClick={onChangePanel}>Перейти к колонкам</Button> */}
    </Panel>
  );
};

export { Desks };
