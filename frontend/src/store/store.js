import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/slices/authSlice'
import employeeReducer from "../store/slices/employeeSlice"
import projectReducer from '../store/slices/projectSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    project: projectReducer,
  },
});
