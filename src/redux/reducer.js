import { createSlice } from "@reduxjs/toolkit";

const initialState = [];


const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
    },
    removeTodos: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateTodos: (state, action) => {
      const { id, status } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.status = status;
      }
    },
    completeTodos: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = true;
      }
    },
  },
});

export const { addTodos, removeTodos, updateTodos, completeTodos } = todoSlice.actions;

export default todoSlice.reducer;

