import React from "react";
import { Card, CardGrid } from "@vkontakte/vkui";
import styles from "./Column.module.css";

interface ColumnProps {}

const Column: React.FC<ColumnProps> = () => {
  return (
    <Card className={styles.column}>
      <CardGrid size="l">
        <Card>a</Card>
        <Card>s</Card>
        <Card>d</Card>
      </CardGrid>
    </Card>
  );
};

export { Column };
