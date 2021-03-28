import React from "react";
import { Button, Div, Gallery, Panel, PanelHeaderSimple } from "@vkontakte/vkui";
import { PanelProps } from "@vkontakte/vkui/dist/components/Panel/Panel";
import { useSnackbarContext } from "../context/snackbar-context";
import styles from "./Columns.module.css";
import { Column } from "./Column";

interface ColumnsProps extends Pick<PanelProps, "id"> {
  onChangePanel: () => void;
}

const Columns: React.FC<ColumnsProps> = ({ id, onChangePanel }) => {
  const { snackbar } = useSnackbarContext();

  return (
    <Panel id={id} className={styles.columns}>
      <PanelHeaderSimple>Доска</PanelHeaderSimple>

      <Div>
        <Gallery slideWidth="100%" align="center">
          <Column />
          <Column />
          <Column />
        </Gallery>
      </Div>

      <Div>
        <Button stretched onClick={onChangePanel}>
          Перейти к колонкам
        </Button>
      </Div>

      {snackbar}
    </Panel>
  );
};

export { Columns };
