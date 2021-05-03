import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/reducers";
import { IDesks } from "./interfaces/IDesks";

export const useDesksSelector = () => {
  const desks = useSelector<RootState, IDesks[]>(({ desks }) => desks?.list || []);
  return desks;
};
