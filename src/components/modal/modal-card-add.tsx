import { InitialForm, useForm } from "@asosunoff/react_use_form";
import { Icon20AddCircle } from "@vkontakte/icons";
import {
  Button,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Input,
  ModalCard,
} from "@vkontakte/vkui";
import React, { FormEventHandler, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAlertContext } from "../../context/alert-context";
import { useModalRootContext } from "../../context/modal-root-context";
import { useSnackbarContext } from "../../context/snackbar-context";
import { addedCard } from "../../features/columns/actions/cardActions";
import { ModalBaseProps } from "./interfaces";

const FORM: InitialForm<"name"> = {
  name: {
    value: "",
    validation: (value) => {
      console.log(value);

      if (!value.trim()) {
        return { errorMessage: "необходимо ввести наименование" };
      }
    },
  },
};

interface ModalCardAddProps extends ModalBaseProps {}

export const ModalCardAdd: React.FC<ModalCardAddProps> = ({ id, onClose }) => {
  const dispatch = useDispatch();

  const {
    handlers,
    values,
    reset: resetHandler,
    isInvalidForm,
  } = useForm(FORM);

  const { setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const { setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  const { getProp } = useModalRootContext();

  const addedColumnHandler = useCallback(
    async (name: string) => {
      await dispatch(addedCard(getProp("columnId"), name));

      setSnackbarHandler({
        onClose: clearSnackbarHandler,
        children: `Добавдена новая карточка "${name}"`,
      });
    },
    [clearSnackbarHandler, dispatch, getProp, setSnackbarHandler]
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
      header="Создать карточку"
      subheader="Карточка отражает конкретную задачу"
    >
      <FormLayout onSubmit={createHandler}>
        <FormItem
          status={
            handlers.name.error && handlers.name.touched ? "error" : "valid"
          }
          bottom={
            handlers.name.error && handlers.name.touched
              ? handlers.name.error.errorMessage
              : ""
          }
        >
          <Input
            autoFocus
            value={handlers.name.value}
            onChange={(ev) => handlers.name.onChange(ev.target.value)}
            placeholder="введите название карточки"
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
