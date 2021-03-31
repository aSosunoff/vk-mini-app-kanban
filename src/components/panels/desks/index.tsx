import React from "react";
import { Group, List, Panel, PanelHeaderSimple } from "@vkontakte/vkui";

import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { useSnackbarContext } from "../../../context/snackbar-context";
import { IDesks } from "../../../Interfaces/IDesks";
import { CreateForm } from "../../create-form";
import { DeskItem } from "../../desk-item";

interface DesksProps extends Pick<PanelProps, "id"> {
  onChangePanel: (desk: IDesks) => void;
  desks: IDesks[];
  onCreateDesk: (name: string) => Promise<void>;
  onDeleteDesk: (desk: IDesks) => void;
}

const Desks: React.FC<DesksProps> = ({ id, desks, onChangePanel, onCreateDesk, onDeleteDesk }) => {
  const { snackbar } = useSnackbarContext();

  return (
    <Panel id={id}>
      <PanelHeaderSimple>Мои доски</PanelHeaderSimple>

      <CreateForm
        onSubmit={onCreateDesk}
        buttonName="Создать доску"
        placeholder="введите название доски"
      />

      {desks && desks.length ? (
        <Group>
          <List>
            {desks.map((desk) => (
              <DeskItem
                key={desk.id}
                id={desk.id}
                onDelete={() => onDeleteDesk(desk)}
                onDeskClick={() => onChangePanel(desk)}
              >
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
