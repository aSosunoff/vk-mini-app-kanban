import React from "react";
import PropsTypes from "prop-types";
import { Panel, Button } from "@vkontakte/vkui";

const Columns = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <div>Панель с колонками</div>
      <Button onClick={onChangePanel}>Перейти к доскам</Button>
    </Panel>
  );
};

Columns.propTypes = {
  id: PropsTypes.string.isRequired,
  onChangePanel: PropsTypes.func.isRequired,
};

export { Columns };
