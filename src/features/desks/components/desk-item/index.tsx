import { connect } from "react-redux";

import { DeskItem } from "./desk-item";
import { RootState } from "../../../../app/redux/reducers";
import * as I from "./interfaces";
import { removeDesk } from "../../actions";

const mapStateToProps = ({}: RootState): I.StateProps => ({});

const mapDispatchToProps = {
  removeDesk,
};

const result = connect(mapStateToProps, mapDispatchToProps)(DeskItem);

export { result as DeskItem };
