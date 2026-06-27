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

export const deleteProject = createAsyncThunk(
  "project/delete",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/project/delete/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(
        `/project/update-project/${id}`,
        data
      );
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
      })

    .addCase(updateProject.fulfilled, (state, action) => {
      state.projects = state.projects.map((project) =>
        project._id === action.payload._id
          ? action.payload
          : project
      );
    })

    .addCase(deleteProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    });
  },
});

export default projectSlice.reducer;