import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Gallery, PanelHeader, PanelHeaderBack, PanelHeaderButton } from "@vkontakte/vkui";
import { Icon24Add } from "@vkontakte/icons";
import { useRoute } from "react-router5";

import { useSnackbarContext } from "../../../../context/snackbar-context";
import styles from "./columns.module.css";
import { Column } from "../../components/column";
import { panel } from "../../../../hooks/useActivePanel";
import { fetchColumns } from "../../actions/columnActions";
import { useDeskSelector } from "../../../desks/selectors";
import { useColumnsSelectors } from "../../selectors";
import { useModalRootContext } from "../../../../context/modal-root-context";

interface ColumnsProps {}

const Columns: React.FC<ColumnsProps> = () => {
  const dispatch = useDispatch();

  const { snackbar } = useSnackbarContext();

  const { route, router } = useRoute();

  const desk = useDeskSelector(route?.params?.deskId);

  const columns = useColumnsSelectors();

  useEffect(() => {
    if (route.params.deskId) {
      dispatch(fetchColumns(route.params.deskId));
    }
  }, [route.params.deskId, dispatch]);

  const { setActiveModalHandler } = useModalRootContext();

  return (
    <>
      <PanelHeader
        left={
          <>
            <PanelHeaderBack onClick={() => router.navigate(panel.DESKS)} />

            <PanelHeaderButton>
              <Icon24Add
                onClick={() => {
                  setActiveModalHandler("add_column");
                }}
              />
            </PanelHeaderButton>
          </>
        }
      >
        Доска - {desk?.name}
      </PanelHeader>

      {columns.length > 0 ? (
        <Gallery slideWidth="100%" align="center" className={styles.gallery} bullets="dark">
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </Gallery>
      ) : null}

      {snackbar}
    </>
  );
};

export { Columns };
