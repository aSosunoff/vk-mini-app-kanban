import { connect } from "react-redux";

import { Columns } from "./colums";
import { RootState } from "../../../../app/redux/reducers";
import * as I from "./interfaces";
import { fetchColumns, addedColumns } from "../../actions/columnActions";
import { IColumn } from "../../interfaces/IColumns";

const mapStateToProps = ({ desks, columns }: RootState): I.StateProps => {
  let columnsSelector = [] as IColumn[];

  if (columns) {
    columnsSelector = Object.entries(columns.column.list).map(([, { column }]) => column);
  }

  return {
    desks: desks?.list ?? [],
    columns: columnsSelector,
  };
};

const mapDispatchToProps = {
  fetchColumns,
  addedColumns,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Columns);

export { result as Columns };
