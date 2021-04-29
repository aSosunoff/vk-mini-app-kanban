import { connect } from "react-redux";

import { Cards } from "./cards";
import { RootState } from "../../../../app/redux/reducers";
import { fetchCards } from "../../actions";
import * as I from "./interfaces";

const mapStateToProps = (
  { cards }: RootState,
  { columnId }: { columnId: string }
): I.StateProps => ({
  cards: cards?.columns[columnId] ?? [],
});

const mapDispatchToProps = {
  fetchCards,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Cards);

export { result as Cards };
