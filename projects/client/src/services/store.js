import { configureStore } from "@reduxjs/toolkit";
import createEmployeeReducer from "./reducer/employeeReducer";

export const store = configureStore({
  reducer: {
    dataEmployee: createEmployeeReducer,
  },
});