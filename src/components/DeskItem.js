import React from "react";
import PropsTypes from "prop-types";
import { Card, Div } from "@vkontakte/vkui";

const DeskItem = ({ children }) => {
  return (
    <Card>
      <Div>{children}</Div>
    </Card>
  );
};

DeskItem.propTypes = {
  children: PropsTypes.node.isRequired,
};

export { DeskItem };
