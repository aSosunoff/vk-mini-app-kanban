import React, { useCallback, useEffect } from "react";
import { Group, List, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";

import { useSnackbarContext } from "../../../../context/snackbar-context";
import { CreateForm } from "../../../../components/create-form";
import { DeskItem } from "../../components/desk-item";
import { useDispatch } from "react-redux";
import { fetchDesks, addedDesk } from "../../actions";
import { clearColumns } from "../../../columns/actions/columnActions";
import { useDesksSelector } from "../../selectors";
import { Icon24Add } from "@vkontakte/icons";
import { useModalRootContext } from "../../../../context/modal-root-context";

interface DesksProps {}

const Desks: React.FC<DesksProps> = () => {
  const dispatch = useDispatch();

  const desks = useDesksSelector();

  const { snackbar, setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  useEffect(() => {
    dispatch(clearColumns());
    dispatch(fetchDesks());
  }, [dispatch]);

  const addedDeskHandler = useCallback(
    async (name: string) => {
      await dispatch(addedDesk(name));

      setSnackbarHandler({
        onClose: clearSnackbarHandler,
        children: `Добавдена новая доска "${name}"`,
      });
    },
    [dispatch, clearSnackbarHandler, setSnackbarHandler]
  );

  const { setActiveModalHandler } = useModalRootContext();

  return (
    <>
      <PanelHeader
        left={
          <PanelHeaderButton>
            <Icon24Add
              onClick={() => {
                setActiveModalHandler("edit_desk");
              }}
            />
          </PanelHeaderButton>
        }
      >
        Мои доски
      </PanelHeader>

      <CreateForm
        onSubmit={addedDeskHandler}
        buttonName="Создать доску"
        placeholder="введите название доски"
      />

      {desks && desks.length ? (
        <Group>
          <List>
            {desks.map((desk) => (
              <DeskItem key={desk.id} desk={desk} />
            ))}
          </List>
        </Group>
      ) : null}
      {snackbar}
    </>
  );
};

export { Desks };
