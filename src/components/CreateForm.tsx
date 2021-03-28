import React, { FormEventHandler, useCallback, useState } from "react";
import { useForm, InitialFormType } from "@asosunoff/react_use_form";
import { Alert, Button, Div, FormItem, FormLayout, FormLayoutGroup, Input } from "@vkontakte/vkui";
import { Icon24Add } from "@vkontakte/icons";
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

interface CreateFormProps {
  buttonName: string;
  placeholder?: string;
  onCreate: (name: string) => Promise<void>;
}

const CreateForm: React.FC<CreateFormProps> = ({ onCreate, buttonName, placeholder }) => {
  const { handlers, values, resetHandler, isInvalidForm } = useForm(FORM);

  const [mode, setMode] = useState<Modes>("button");

  const { setPopoutHandler } = useAlertContext();

  const createHandler = useCallback<FormEventHandler<HTMLElement>>(
    async (event) => {
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
        await onCreate(values.name);

        setMode("button");

        resetHandler();
      }
    },
    [isInvalidForm, onCreate, resetHandler, setPopoutHandler, values.name]
  );

  if (mode === "button") {
    return (
      <Div>
        <Button size="l" stretched before={<Icon24Add />} onClick={() => setMode("form")}>
          {buttonName}
        </Button>
      </Div>
    );
  }

  return (
    <FormLayout onSubmit={createHandler}>
      <FormItem
        /* top="Наименование доски" */
        status={handlers.name.error && handlers.name.touched ? "error" : "valid"}
        bottom={
          handlers.name.error && handlers.name.touched ? handlers.name.error.errorMessage : ""
        }
      >
        <Input
          autoFocus
          value={handlers.name.value}
          onChange={handlers.name.onChange}
          placeholder={placeholder}
        />
      </FormItem>

      <FormLayoutGroup mode="horizontal">
        <FormItem>
          <Button size="l" stretched before={<Icon24Add />} onClick={createHandler}>
            Создать доску
          </Button>
        </FormItem>

        <FormItem>
          <Button size="l" stretched onClick={() => setMode("button")} mode="tertiary" color="red">
            Отменить
          </Button>
        </FormItem>
      </FormLayoutGroup>
    </FormLayout>
  );
};

export { CreateForm };
