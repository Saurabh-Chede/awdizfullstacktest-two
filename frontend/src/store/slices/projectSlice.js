import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/config/axiosConfig";

export const fetchProjects = createAsyncThunk(
  "project/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/project/get-projects");
      return res.data.projects;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const addProject = createAsyncThunk(
  "project/add",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/project/create-project", data);
      return res.data.project;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const projectSlice = createSlice({
  name: "project",

  initialState: {
    projects: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })

      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
});

export default projectSlice.reducer;