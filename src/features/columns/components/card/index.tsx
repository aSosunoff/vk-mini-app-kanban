import { connect } from "react-redux";

import { Card } from "./card";
import { RootState } from "../../../../app/redux/reducers";
import { removeCard } from "../../actions/cardActions";
import * as I from "./interfaces";

const mapStateToProps = ({}: RootState): I.StateProps => ({});

const mapDispatchToProps = {
  removeCard,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Card);

export { result as Card };
