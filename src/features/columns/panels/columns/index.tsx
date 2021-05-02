import { connect } from "react-redux";

import { Columns } from "./colums";
import { RootState } from "../../../../app/redux/reducers";
import * as I from "./interfaces";
import { fetchColumns, addedColumns } from "../../actions";

const mapStateToProps = ({ desks, columns }: RootState): I.StateProps => ({
  desks: desks?.list ?? [],
  columns: columns?.columns ?? [],
});

const mapDispatchToProps = {
  fetchColumns,
  addedColumns,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Columns);

export { result as Columns };
