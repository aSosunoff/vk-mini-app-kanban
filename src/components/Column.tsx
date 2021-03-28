import React from "react";
import { Card, CardGrid, Group, Header } from "@vkontakte/vkui";
import { Icon16Delete } from "@vkontakte/icons";
import styles from "./Column.module.css";
import { ColumnCard } from "./ColumnCard";

interface ColumnProps {
  name: string;
}

const Column: React.FC<ColumnProps> = ({ name }) => {
  return (
    <Group
      header={
        <Header
          mode="secondary"
          aside={
            <Icon16Delete
              onClick={() => {
                console.log(1);
              }}
            />
          }
        >
          {name}
        </Header>
      }
    >
      <CardGrid size="l">
        <ColumnCard>a</ColumnCard>
        <ColumnCard>b</ColumnCard>
        <ColumnCard>c</ColumnCard>
      </CardGrid>
    </Group>
  );
};

export { Column };
