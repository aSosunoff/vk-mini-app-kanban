import React from "react";
import { Cell } from "@vkontakte/vkui";
import { Icon24DeleteOutline } from "@vkontakte/icons";

interface DeskItemProps {
  id: string;
}

const DeskItem: React.FC<DeskItemProps> = ({ id, children }) => {
  return (
    <Cell
      expandable
      after={
        <Icon24DeleteOutline
          onClick={() => {
            console.log(id);
          }}
        />
      }
    >
      {children}
    </Cell>
  );
};

export { DeskItem };
