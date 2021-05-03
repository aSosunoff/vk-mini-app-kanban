import { connect } from "react-redux";

import { Cards } from "./cards";
import { RootState } from "../../../../app/redux/reducers";
import { fetchCards, addedCard, removeCard } from "../../actions/cardActions";
import * as I from "./interfaces";

const mapStateToProps = (
  { columns }: RootState,
  { columnId }: { columnId: string }
): I.StateProps => ({
  cards: columns?.column.list[columnId].cards ?? [],
});

const mapDispatchToProps = {
  fetchCards,
  addedCard,
  removeCard,
};

const result = connect(mapStateToProps, mapDispatchToProps)(Cards);

export { result as Cards };
