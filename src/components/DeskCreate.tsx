import React, { FormEventHandler, useCallback, useState } from "react";
import { useForm, InitialFormType } from "@asosunoff/react_use_form";
import firebase from "firebase/app";
import {
  Alert,
  Button,
  Div,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Input,
  Snackbar,
} from "@vkontakte/vkui";
import { Icon24Add, Icon24DeleteOutline } from "@vkontakte/icons";
import { useAlertContext } from "../context/alert-context";
import { useSnackbarContext } from "../context/snackbar-context";
import { IDesks } from "../Interfaces/IDesks";

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

interface DeskCreateProps {
  onCreate: (desk: IDesks) => void;
}

const DeskCreate: React.FC<DeskCreateProps> = ({ onCreate }) => {
  const { handlers, values, resetHandler, isInvalidForm } = useForm(FORM);

  const [mode, setMode] = useState<Modes>("button");

  const { setPopoutHandler } = useAlertContext();

  const { setSnackbarHandler } = useSnackbarContext();

  const createDeskHandler = useCallback<FormEventHandler<HTMLElement>>(
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
        try {
          const db = firebase.firestore();

          const docRef = await db.collection("desks").add({
            name: values.name,
          });

          const doc = await docRef.get();

          const data = doc.data();

          onCreate({ id: doc.id, name: (data as IDesks).name });

          setSnackbarHandler(
            <Snackbar onClose={() => setSnackbarHandler(null)}>
              Добавдена новая доска "{(data as IDesks).name}"
            </Snackbar>
          );

          setMode("button");

          resetHandler();
        } catch (error) {
          console.error("Error writing document: ", error);
        }
      }
    },
    [isInvalidForm, onCreate, resetHandler, setPopoutHandler, setSnackbarHandler, values.name]
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
