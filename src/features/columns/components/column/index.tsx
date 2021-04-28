import { connect } from "react-redux";

import { Column } from "./column";
import { RootState } from "../../../../app/redux/reducers";
import * as I from "./interfaces";
import { removeColumn } from "../../actions";

const mapStateToProps = ({}: RootState): I.StateProps => ({});

const mapDispatchToProps = {
  removeColumn,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Column);

export { result as Column };
