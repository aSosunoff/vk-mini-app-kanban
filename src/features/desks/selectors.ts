import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/reducers";
import { IDesks } from "./interfaces/IDesks";

export const useDesksSelector = () => {
  const desks = useSelector<RootState, IDesks[]>(({ desks }) => desks?.list || []);
  return desks;
};

export const useDeskSelector = (deskId: string) => {
  const desks = useDesksSelector();

  const desk = useMemo(() => desks.find(({ id }) => id === deskId), [desks, deskId]);

  return desk;
};
