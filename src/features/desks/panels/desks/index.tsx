import { connect } from "react-redux";

import { Desks } from "./desks";
import { RootState } from "../../../../app/redux/reducers";
import * as I from "./interfaces";
import { fetchDesks, addedDesk } from "../../actions";
import { clearColumns } from "../../../columns/actions/columnActions";

const mapStateToProps = ({ desks }: RootState): I.StateProps => ({
  desks: desks?.list ?? [],
  loading: desks?.loading ?? false,
  error: desks?.error,
});

const mapDispatchToProps = {
  fetchDesks,
  addedDesk,
  clearColumns,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Desks);

export { result as Desks };
