import React, { useCallback, useEffect } from "react";
import { Group, List, Panel, PanelHeaderSimple } from "@vkontakte/vkui";

import { useSnackbarContext } from "../../../../context/snackbar-context";
import { CreateForm } from "../../../../components/create-form";
import { DeskItem } from "../../components/desk-item";
import * as I from "./interfaces";

const Desks: React.FC<I.StateProps & I.DispatchProps & I.OwnProps> = ({
  id,
  fetchDesks,
  addedDesk,
  desks,
}) => {
  const { snackbar, setSnackbarHandler, clearSnackbarHandler } = useSnackbarContext();

  useEffect(() => {
    fetchDesks();
  }, [fetchDesks]);

  const addedDeskHandler = useCallback(
    async (name: string) => {
      await addedDesk(name);

      setSnackbarHandler({
        onClose: clearSnackbarHandler,
        children: `Добавдена новая доска "${name}"`,
      });
    },
    [addedDesk, clearSnackbarHandler, setSnackbarHandler]
  );

  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <CreateForm
        onSubmit={addedDeskHandler}
        buttonName="Создать доску"
        placeholder="введите название доски"
      />

      {desks && desks.length ? (
        <Group>
          <List>
            {desks.map((desk) => (
              <DeskItem key={desk.id} desk={desk}>
                {desk.name}
              </DeskItem>
            ))}
          </List>
        </Group>
      ) : null}
      {snackbar}
    </Panel>
  );
};

export { Desks };
