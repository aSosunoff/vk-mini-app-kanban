import React, { useEffect } from "react";
import {
  Button,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Input,
  ModalCard,
  ModalRoot,
  Panel,
  View,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Desks } from "../features/desks/panels/desks";
import { Columns } from "../features/columns/panels/columns";
import { useAlertContext } from "../context/alert-context";
import { panel } from "../hooks/useActivePanel";
import { useRoute } from "react-router5";
import { Card } from "../features/columns/panels/card";
import { useActionSheetContext } from "../context/action-sheet-context";
import { useModalRootContext } from "../context/modal-root-context";

const MODAL_PAGE_EDIT_DESK = "edit_desk";

/* interface ModalProps extends Pick<ModalRootProps, "activeModal"> {} */

const Modal: React.FC = () => {
  const { activeModal, setActiveModalHandler } = useModalRootContext();

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalCard
        id={MODAL_PAGE_EDIT_DESK}
        onClose={() => setActiveModalHandler(null)}
        /* icon={<Icon56MoneyTransferOutline />} */
        header="Создать новую доску"
        subheader="Доски необходимы для того, что бы обьеденить какую либо работу"
      >
        <FormLayout /* onSubmit={createHandler} */>
          <FormItem
          /* status={handlers.name.error && handlers.name.touched ? "error" : "valid"} */
          /* bottom={
              handlers.name.error && handlers.name.touched ? handlers.name.error.errorMessage : ""
            } */
          >
            <Input
              autoFocus
              /* value={handlers.name.value} */
              /* onChange={handlers.name.onChange} */
              placeholder="введите название доски"
            />
          </FormItem>

          <FormLayoutGroup mode="horizontal">
            <FormItem>
              <Button size="l" stretched /* onClick={createHandler} */>
                Создать
              </Button>
            </FormItem>
          </FormLayoutGroup>
        </FormLayout>
      </ModalCard>
    </ModalRoot>
  );
};

const App: React.FC<{ hasError: boolean }> = ({ hasError }) => {
  const { route } = useRoute();

  const { popout: popoutAlert, setPopoutHandler, clearPopoutHandler } = useAlertContext();

  const { popout: popoutActionSheet } = useActionSheetContext();

  useEffect(() => {
    if (hasError) {
      setPopoutHandler({
        header: "Внимание",
        text: "Возникла ошибка",
        actions: [
          {
            title: "понял",
            mode: "default",
            autoclose: true,
          },
        ],
        actionsLayout: "vertical",
        onClose: clearPopoutHandler,
      });
    }
  }, [hasError, setPopoutHandler, clearPopoutHandler]);

  return (
    <View activePanel={route.name} popout={popoutAlert || popoutActionSheet} modal={<Modal />}>
      <Panel id={panel.DESKS}>
        <Desks />
      </Panel>

      <Panel
        id={panel.COLUMNS}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Columns />
      </Panel>

      <Panel id={panel.CARD}>
        <Card />
      </Panel>
    </View>
  );
};

export { App };
