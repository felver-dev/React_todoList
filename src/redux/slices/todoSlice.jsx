/* eslint-disable no-ex-assign */
import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../api/api";

const initialState = {
  status: "idle",
  error: "",
  todos: [],
};

export const fetchAllTasks = createAsyncThunk(
  "todos/fetchAllTasks",
  async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      error = error.message;
      isRejectedWithValue(error.response);
    }
  }
);

export const updateTasks = createAsyncThunk(
  "todos/updateTasks",
  async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${data.id}`);
      return response.data;
    } catch (error) {
      isRejectedWithValue(error.response);
      error = error.message;
    }
  }
);

export const createTasks = createAsyncThunk(
  "todos/createTasks",
  async (data) => {
    try {
      const response = await axios.post(BASE_URL, data);
      return response.data;
    } catch (error) {
      isRejectedWithValue(error.response);
      error = error.message;
    }
  }
);
export const removeTasks = createAsyncThunk("todos/removeTasks", async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    isRejectedWithValue(error.response);
    error = error.message;
  }
});

export const restoreTasks = createAsyncThunk(
  "todos/restoreTasks",
  async (id) => {
    try {
      const response = await axios.put(`${BASE_URL}/restore/${id}`);
      return response.data;
    } catch (error) {
      isRejectedWithValue(error.response);
      error = error.message;
    }
  }
);
export const completeTasks = createAsyncThunk(
  "todos/completeTasks",
  async (id) => {
    try {
      const response = await axios.put(`${BASE_URL}/complete/${id}`);
      return response.data;
    } catch (error) {
      isRejectedWithValue(error.response);
      error = error.message;
    }
  }
);
export const readTasks = createAsyncThunk("todos/readTasks", async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/read/${id}`);
    return response.data;
  } catch (error) {
    isRejectedWithValue(error.response);
    error = error.message;
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllTasks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = action.payload;
    });

    builder.addCase(updateTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTasks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(updateTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });

    builder.addCase(createTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createTasks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(createTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos.push(action.payload);
    });

    builder.addCase(removeTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeTasks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(removeTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });

    builder.addCase(readTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(readTasks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(readTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });

    builder.addCase(completeTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(completeTasks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(completeTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });

    builder.addCase(restoreTasks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(restoreTasks.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(restoreTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    });
  },
});

export const selectAllTodos = (state) => state.todos.todos;
export const selectTodoStatus = (state) => state.todos.status;
export default todosSlice.reducer;
