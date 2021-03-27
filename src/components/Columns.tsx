import React from "react";
import { Panel, Button } from "@vkontakte/vkui";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";

interface ColumnsProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
}

const Columns: React.FC<ColumnsProps> = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <div>Панель с колонками</div>
      <Button onClick={onChangePanel}>Перейти к доскам</Button>
    </Panel>
  );
};

export { Columns };
