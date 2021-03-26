import React from "react";
import PropsTypes from "prop-types";
import { Panel, Button, PanelHeaderSimple } from "@vkontakte/vkui";

const Desks = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

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
