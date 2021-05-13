import React, { useEffect } from "react";
import { Group, List, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";

import { useSnackbarContext } from "../../../../context/snackbar-context";
import { DeskItem } from "../../components/desk-item";
import { useDispatch } from "react-redux";
import { fetchDesks } from "../../actions";
import { clearColumns } from "../../../columns/actions/columnActions";
import { useDesksSelector } from "../../selectors";
import { Icon24Add } from "@vkontakte/icons";
import { useModalRootContext } from "../../../../context/modal-root-context";

interface DesksProps {}

const Desks: React.FC<DesksProps> = () => {
  const dispatch = useDispatch();

  const desks = useDesksSelector();

  const { snackbar } = useSnackbarContext();

  useEffect(() => {
    dispatch(clearColumns());
    dispatch(fetchDesks());
  }, [dispatch]);

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
