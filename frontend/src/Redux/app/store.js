import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Slices/Auth/Auth";
import tasksReducer from "../features/Slices/Tasks/tasks";
import TogglerReducer from "../features/Slices/Toggler/Toggler";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    toggler: TogglerReducer,
  },
});
