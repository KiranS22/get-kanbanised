import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAllTasks = createAsyncThunk(
  "tasks/fetchAllTasks",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      throw new Error("Failed");
    }
  }
);

const initialState = {
  tasks: [],
  tasksCount: 0,
  // Kept in to help monitor future bugs. Not being used in project
  isLoading: false,
  isError: false,
};

const tasks = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasksCount++;
      state.tasks.push(action.payload);
    },
    updateStatus: (state, { payload }) => {
      const { status, id } = payload;
      console.log("Payload:", state.tasks.tasks);
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          task.status = status;
        }
        return task;
      });
    },
    deleteTask: (state, action) => {
      console.log("delete", action.payload);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasksCount--;
    },
    updateContent: (state, { payload }) => {
      const { content, id } = payload;
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) {
          task.task_name = content;
        }
        return task;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.tasksCount = action.payload.length;
    });

    builder.addCase(fetchAllTasks.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = true;
    });
  },
});
export const selectTsskCount = (state) => state.tasks.tasksCount;

export const selectTodoTasks = (state) =>
  state.tasks.tasks.filter((task) => task.status === "todo");

export const selectDoingTasks = (state) =>
  state.tasks.tasks.filter((task) => task.status === "doing");

export const selectDoneTasks = (state) =>
  state.tasks.tasks.filter((task) => task.status === "done");
export const selectTaskCount = (state) => state.tasks.tasksCount;

export const { addTask, updateStatus, deleteTask, updateContent } =
  tasks.actions;

export default tasks.reducer;
