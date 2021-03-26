import React from "react";
import PropsTypes from "prop-types";
import { Panel, CardGrid, PanelHeaderSimple } from "@vkontakte/vkui";
import { DeskItem } from "./DeskItem";
import { DeskList } from "./DeskList";

const Desks = ({ id, onChangePanel }) => {
  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <DeskList
        list={[
          {
            name: "Доска 1",
          },
          {
            name: "Доска 2",
          },
        ]}
      />

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
