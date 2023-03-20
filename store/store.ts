import { configureStore } from "@reduxjs/toolkit";
import authReducer, { AuthInterface } from "./reducers/authReducer";
import loadingReducer, { LoadingReducer } from "./reducers/loadingReducer";

const rootReducer = configureStore({
  reducer: {
    authObject: authReducer,
    loading: loadingReducer,
  },
  devTools: true,
});

export type RootState = {
  authObject: AuthInterface;
  loading: LoadingReducer;
};
export default rootReducer;
