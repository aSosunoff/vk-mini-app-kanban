import React from "react";
import { Panel, Button } from "@vkontakte/vkui";

export const Desks = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <div>Панель с досками</div>
      <Button onClick={onChangePanel}>Перейти к колонкам</Button>
    </Panel>
  );
};
