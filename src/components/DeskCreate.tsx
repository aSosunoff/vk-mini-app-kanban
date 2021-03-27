import React from "react";
import { Button, Div } from "@vkontakte/vkui";
import { Icon24Add } from "@vkontakte/icons";

const DeskCreate: React.FC = () => {
  return (
    <Div>
      <Button size="l" stretched before={<Icon24Add />}>
        Создать доску
      </Button>
    </Div>
  );
};

export { DeskCreate };
