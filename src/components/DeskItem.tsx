import React from "react";
import { Card, Div } from "@vkontakte/vkui";

const DeskItem: React.FC = ({ children }) => {
  return (
    <Card>
      <Div>{children}</Div>
    </Card>
  );
};

export { DeskItem };
