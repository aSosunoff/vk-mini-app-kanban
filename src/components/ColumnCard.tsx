import React from "react";
import { Card } from "@vkontakte/vkui";

interface ColumnCardProps {}

const ColumnCard: React.FC<ColumnCardProps> = ({ children }) => {
  return <Card>{children}</Card>;
};

export { ColumnCard };
