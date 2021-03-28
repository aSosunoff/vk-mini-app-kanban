import React from "react";
import { CardGrid } from "@vkontakte/vkui";
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
    <CardGrid size="l">
      {list.map(({ name }, index) => (
        <DeskItem key={index}>{name}</DeskItem>
      ))}
    </CardGrid>
  );
};

export { DeskList };
