import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Desks } from "./desks";
import { RootState } from "../../../redux/reducers";
import * as I from "./interfaces";
import { fetchDesks, addedDesk } from "../../../redux/actions/desks-action";

const mapStateToProps = ({ desks }: RootState): I.StateProps => ({
  desks: desks?.list ?? [],
  loading: desks?.loading ?? false,
  error: desks?.error,
});

const mapDispatchToProps = {
  fetchDesks,
  addedDesk,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Desks);

export { result as Desks };
