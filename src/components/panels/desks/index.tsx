import React from "react";
import { Group, List, Panel, PanelHeaderSimple } from "@vkontakte/vkui";

import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { useSnackbarContext } from "../../../context/snackbar-context";
import { CreateForm } from "../../create-form";
import { DeskItem } from "../../desk-item";
import { useAppStateContext } from "../../../context/app-state-context";

interface DesksProps extends Pick<PanelProps, "id"> {}

const Desks: React.FC<DesksProps> = ({ id }) => {
  const { snackbar } = useSnackbarContext();

  const { desks, createDeskHandler } = useAppStateContext();

  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <CreateForm
        onSubmit={createDeskHandler}
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
