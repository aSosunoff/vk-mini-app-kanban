import { connect } from "react-redux";
import { Dispatch } from "redux";

import { DeskItem } from "./desk-item";
import { RootState } from "../../redux/reducers";
import * as I from "./interfaces";
import { removeDesk } from "../../redux/actions/desks-action";

const mapStateToProps = ({}: RootState): I.StateProps => ({});

const mapDispatchToProps = {
  removeDesk,
};

const result = connect(mapStateToProps, mapDispatchToProps)(DeskItem);

export { result as DeskItem };
