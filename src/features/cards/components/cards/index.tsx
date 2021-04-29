import { connect } from "react-redux";

import { Cards } from "./cards";
import { RootState } from "../../../../app/redux/reducers";
import * as I from "./interfaces";

const mapStateToProps = ({}: RootState): I.StateProps => ({});

const mapDispatchToProps = {};

const result = connect(mapStateToProps, mapDispatchToProps)(Cards);

export { result as Cards };
