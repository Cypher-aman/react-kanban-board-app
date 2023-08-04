import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/reducer";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
