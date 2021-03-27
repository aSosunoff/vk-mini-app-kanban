import React, { useState } from "react";
import { Button, Div, FormItem, FormLayout, FormLayoutGroup, Input } from "@vkontakte/vkui";
import { Icon24Add, Icon24DeleteOutline } from "@vkontakte/icons";

type Modes = "button" | "form";

const DeskCreate: React.FC = () => {
  const [mode, setMode] = useState<Modes>("button");
  const [name, setName] = useState("");

  if (mode === "button") {
    return (
      <Div>
        <Button size="l" stretched before={<Icon24Add />} onClick={() => setMode("form")}>
          Создать доску
        </Button>
      </Div>
    );
  }

  return (
    <FormLayout>
      <FormItem top="Наименование доски">
        <Input
          autoFocus
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </FormItem>

      <FormLayoutGroup mode="horizontal">
        <FormItem>
          <Button size="l" stretched before={<Icon24Add />}>
            Создать доску
          </Button>
        </FormItem>

        <FormItem>
          <Button
            size="l"
            stretched
            onClick={() => setMode("button")}
            before={<Icon24DeleteOutline />}
            mode="tertiary"
            color="red"
          >
            Отменить
          </Button>
        </FormItem>
      </FormLayoutGroup>
    </FormLayout>
  );
};

export { DeskCreate };
