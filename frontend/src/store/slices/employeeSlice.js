import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/config/axiosConfig";
export const fetchEmployees = createAsyncThunk(
  "employee/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/employee/employees");
      return res.data.employees;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employee/add",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/employee/create-employee", data);
      return res.data.employee;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/employee/update/${id}`, data);
      return res.data.employee;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/employee/delete/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",

  initialState: {
    employees: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })

      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map((emp) =>
          emp._id === action.payload._id ? action.payload : emp
        );
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;