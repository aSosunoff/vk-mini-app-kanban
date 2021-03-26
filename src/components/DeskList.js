import React from "react";
import PropsTypes from "prop-types";
import { CardGrid } from "@vkontakte/vkui";
import { DeskItem } from "./DeskItem";

const DeskList = ({ list }) => {
  return (
    <CardGrid size="l">
      {list.map(({ name }, index) => (
        <DeskItem key={index}>{name}</DeskItem>
      ))}
    </CardGrid>
  );
};

DeskList.propTypes = {
  list: PropsTypes.arrayOf(
    PropsTypes.shape({
      name: PropsTypes.string,
    })
  ),
};

export { DeskList };
