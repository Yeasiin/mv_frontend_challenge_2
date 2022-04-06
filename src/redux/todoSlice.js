import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  todoLists: [
    {
      id: "1",
      title: "Design the solution	",
      details:
        "Identify resources to be monitored, Define users and workflow    Identify event sources by resource type, Define the relationship between resources and business systems, Identify tasks and URLs by resource type, Define the server configuration. ",
    },
    {
      id: "2",
      title: "Prepare for implementation	",
      details:
        "Identify the implementation team, Order the server hardware for production as well as test/quality assurance (QA), Order console machines, Order console machines, Identify the test LPAR, Identify production LPARs ",
    },
    {
      id: "3",
      title: "Prepare the test/QA environment",
      details:
        "Install test and QA servers and prerequisite software, Install console machines and prerequisite software, Verify connectivity from test and QA servers to test LPAR, Tivoli Enterprise Console(R) server, and console machines, ",
    },
  ],
  todo: { id: "", title: "", details: "" },
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Creating new Todo Or Updating existing One
    addTodo: (state, action) => {
      const oldNote = state.todoLists.find((n) => n.id === action.payload.id);
      if (oldNote) {
        const oldNotes = state.todoLists.map((n) => {
          if (n.id === action.payload.id) {
            n.title = action.payload.title;
            n.details = action.payload.details;
          }
          return n;
        });
        state.todoLists = oldNotes;
        state.todo = { id: "", title: "", details: "" };
        return state;
      } else {
        const newTodo = { ...action.payload };
        newTodo.id = uuidv4();
        state.todoLists = [...state.todoLists, newTodo];
        state.todo = { id: "", title: "", details: "" };
        return state;
      }
    },

    // Deleting / Removing Todo List
    removeTodo: (state, action) => {
      state.todoLists = state.todoLists.filter(
        (todo) => todo.id !== action.payload
      );
      return state;
    },

    // Selecting todo For editing -- Selecting and populating Input filed
    editTodo: (state, action) => {
      state.todo = state.todoLists.find((todo) => todo.id === action.payload);
      return state;
    },

    // Taking value from Input filed And Updating Redux Store
    setTodo: (state, action) => {
      state.todo = action.payload;
      return state;
    },

    // Clearing Input filed Data
    clearInput: (state, action) => {
      state.todo = { id: "", title: "", details: "" };
      return state;
    },

    reArrange: (state, action) => {
      state.todoLists = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, editTodo, setTodo, clearInput, reArrange } =
  todoSlice.actions;

export default todoSlice.reducer;
