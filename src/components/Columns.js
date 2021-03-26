import React from "react";
import { Panel, Button } from "@vkontakte/vkui";

export const Columns = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <div>Панель с колонками</div>
      <Button onClick={onChangePanel}>Перейти к доскам</Button>
    </Panel>
  );
};
