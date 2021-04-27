import { connect } from "react-redux";

import { Columns } from "./colums";
import { RootState } from "../../../redux/reducers";
import { fetchColumns, addedColumns } from "../../../redux/actions/columns-action";
import * as I from "./interfaces";

const mapStateToProps = ({ desks, columns }: RootState): I.StateProps => ({
  desks: desks?.list ?? [],
  columns: columns?.list ?? [],
});

const mapDispatchToProps = {
  fetchColumns,
  addedColumns,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Columns);

export { result as Columns };
