import React from "react";
import PropsTypes from "prop-types";
import { Panel, CardGrid, PanelHeaderSimple } from "@vkontakte/vkui";
import { DeskItem } from "./DeskItem";

const Desks = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <CardGrid size="l">
        <DeskItem>Доска 1</DeskItem>
        <DeskItem>Доска 2</DeskItem>
      </CardGrid>

      {/* <div>Панель с досками</div>
      <Button onClick={onChangePanel}>Перейти к колонкам</Button> */}
    </Panel>
  );
};

Desks.propTypes = {
  id: PropsTypes.string.isRequired,
  onChangePanel: PropsTypes.func.isRequired,
};

export { Desks };
