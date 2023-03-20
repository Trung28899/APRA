import type { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";

const useRedux = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  return {
    dispatch,
    state,
  };
};

export { useRedux };
