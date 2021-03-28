import React from "react";
import { Group, List } from "@vkontakte/vkui";
import { DeskItem } from "./DeskItem";
import { IDesks } from "../Interfaces/IDesks";

interface DeskListProps {
  list: IDesks[];
}

const DeskList: React.FC<DeskListProps> = ({ list }) => {
  if (!list || !list.length) {
    return null;
  }

  return (
    <Group>
      <List>
        {list.map(({ id, name }) => (
          <DeskItem key={id} id={id}>
            {name}
          </DeskItem>
        ))}
      </List>
    </Group>
  );
};

export { DeskList };
