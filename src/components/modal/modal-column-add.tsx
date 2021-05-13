import { InitialFormType, useForm } from "@asosunoff/react_use_form";
import { Icon20AddCircle } from "@vkontakte/icons";
import { Button, FormItem, FormLayout, FormLayoutGroup, Input, ModalCard } from "@vkontakte/vkui";
import React, { FormEventHandler, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "react-router5";
import { useAlertContext } from "../../context/alert-context";
import { useSnackbarContext } from "../../context/snackbar-context";
import { addedColumns } from "../../features/columns/actions/columnActions";
import { ModalBaseProps } from "./interfaces";

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

interface ModalColumnAddProps extends ModalBaseProps {}

export const ModalColumnAdd: React.FC<ModalColumnAddProps> = ({ id, onClose }) => {
  const dispatch = useDispatch();

  const { handlers, values, resetHandler, isInvalidForm } = useForm(FORM);

  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const { route } = useRoute();

  const addedColumnHandler = useCallback(
    async (name: string) => {
      if (route?.params?.deskId) {
        await dispatch(addedColumns(route?.params?.deskId, name));

        setSnackbarHandler({
          onClose: clearSnackbarHandler,
          children: `Добавдена новая колонка "${name}"`,
        });
      }
    },
    [clearSnackbarHandler, dispatch, route?.params?.deskId, setSnackbarHandler]
  );

  const createHandler = useCallback<FormEventHandler<HTMLElement>>(
    async (event) => {
      if (event) {
        event.preventDefault();
      }

      if (isInvalidForm) {
        setPopoutHandler({
          header: "Внимание",
          text: "Не все обязательные поля заполнены",
          actions: [
            {
              title: "Понял",
              mode: "destructive",
              autoclose: true,
            },
          ],
          actionsLayout: "vertical",
          onClose: clearPopoutHandler,
        });
      } else {
        await addedColumnHandler(values.name);

        onClose();

        resetHandler();
      }
    },
    [
      addedColumnHandler,
      clearPopoutHandler,
      isInvalidForm,
      resetHandler,
      setPopoutHandler,
      onClose,
      values.name,
    ]
  );

  return (
    <ModalCard
      id={id}
      onClose={onClose}
      icon={<Icon20AddCircle />}
      header="Создать колонку"
      subheader="Колонки содержат задачи соответствующие текущей колонке"
    >
      <FormLayout onSubmit={createHandler}>
        <FormItem
          status={handlers.name.error && handlers.name.touched ? "error" : "valid"}
          bottom={
            handlers.name.error && handlers.name.touched ? handlers.name.error.errorMessage : ""
          }
        >
          <Input
            autoFocus
            value={handlers.name.value}
            onChange={handlers.name.onChange}
            placeholder="введите название колонки"
          />
        </FormItem>

        <FormLayoutGroup mode="horizontal">
          <FormItem>
            <Button size="l" stretched>
              Создать
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </FormLayout>
    </ModalCard>
  );
};
