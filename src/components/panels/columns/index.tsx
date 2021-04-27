import { connect } from "react-redux";

import { Columns } from "./colums";
import { RootState } from "../../../redux/reducers";
import * as I from "./interfaces";

const mapStateToProps = ({ desks }: RootState): I.StateProps => ({
  desks: desks?.list ?? [],
});

const mapDispatchToProps = () => ({});

const result = connect(mapStateToProps, mapDispatchToProps)(Columns);

export { result as Columns };
