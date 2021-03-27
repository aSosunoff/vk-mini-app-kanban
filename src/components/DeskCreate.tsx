import React, { FormEventHandler, useCallback, useState } from "react";
import { useForm, InitialFormType } from "@asosunoff/react_use_form";
import { Alert, Button, Div, FormItem, FormLayout, FormLayoutGroup, Input } from "@vkontakte/vkui";
import { Icon24Add, Icon24DeleteOutline } from "@vkontakte/icons";
import { useAlertContext } from "../context/alert-context";

type Modes = "button" | "form";

const FORM: InitialFormType<"name"> = {
  name: {
    value: "",
    validation: (value) => {
      if (!value.trim()) {
        return { errorMessage: "необходимо ввести наименование" };
      }
    },
  },
};

const DeskCreate: React.FC = () => {
  const { handlers, values, resetHandler, isInvalidForm } = useForm(FORM);

  const [mode, setMode] = useState<Modes>("button");

  const { setPopoutHandler } = useAlertContext();

  const createDeskHandler = useCallback<FormEventHandler<HTMLElement>>(
    (event) => {
      if (event) {
        event.preventDefault();
      }

      if (isInvalidForm) {
        setPopoutHandler(
          <Alert
            header="Внимание"
            text="Не все обязательные поля заполнены"
            actions={[
              {
                title: "Понял",
                mode: "destructive",
                autoclose: true,
              },
            ]}
            actionsLayout="vertical"
            onClose={() => setPopoutHandler(null)}
          />
        );
      } else {
        console.log(values);

        setMode("button");

        resetHandler();
      }
    },
    [values]
  );

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
    <FormLayout onSubmit={createDeskHandler}>
      <FormItem
        top="Наименование доски"
        status={handlers.name.error && handlers.name.touched ? "error" : "valid"}
        bottom={
          handlers.name.error && handlers.name.touched ? handlers.name.error.errorMessage : ""
        }
      >
        <Input
          autoFocus
          value={handlers.name.value}
          onChange={handlers.name.onChange}
          placeholder="введите название доски"
        />
      </FormItem>

      <FormLayoutGroup mode="horizontal">
        <FormItem>
          <Button size="l" stretched before={<Icon24Add />} onClick={createDeskHandler}>
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
