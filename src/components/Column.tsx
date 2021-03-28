import React from "react";
import { Card, CardGrid } from "@vkontakte/vkui";
import styles from "./Column.module.css";
import { ColumnCard } from "./ColumnCard";

interface ColumnProps {}

const Column: React.FC<ColumnProps> = () => {
  return (
    <Card className={styles.column}>
      <CardGrid size="l">
        <ColumnCard>a</ColumnCard>
        <ColumnCard>b</ColumnCard>
        <ColumnCard>c</ColumnCard>
      </CardGrid>
    </Card>
  );
};

export { Column };
