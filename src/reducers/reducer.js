import { createSlice } from "@reduxjs/toolkit";
import { data } from "../../data";

const initialState = {
  user: {
    id: "user1",
    name: "Name",
    sharedBoards: [],
    myBoards: [...data],
  },
  activeBoard: null,
  darkMode: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      const { id, mode } = action.payload;
      if (mode === "personal") {
        state.activeBoard = state.user.myBoards.find((b) => b.id === id);
      }
      if (mode === "shared") {
        state.activeBoard = state.user.sharedBoards.find((b) => b.id === id);
      }
    },
    setSubtaskStatus: (state, action) => {
      const { colId, taskId, subId, mode } = action.payload;

      if (mode === "personal") {
        const [col] = state.activeBoard.columns.filter(
          (col) => col.id === colId
        );
        const [task] = col.tasks.filter((task) => task.id === taskId);
        const [subtask] = task.subtasks.filter((sub) => sub.id === subId);

        subtask.isCompleted = subtask.isCompleted ? false : true;
      }
    },
    setTaskColumn: (state, action) => {
      const { prevColId, nextColId, taskId, mode } = action.payload;
      if (mode === "personal") {
        let prevCol, prevColIndex, nextCol, nextColIndex, task, index;

        state.activeBoard.columns.forEach((column, index) => {
          if (column.id === prevColId) {
            prevCol = column;
            prevColIndex = index;
          }
          if (column.id === nextColId) {
            nextCol = column;
            nextColIndex = index;
          }
        });

        prevCol.tasks.forEach((t, i) => {
          if (t.id === taskId) {
            (task = t), (index = i);
          }
        });
        console.log({
          col: {
            prevCol,
            prevColIndex,
            nextCol,
            nextColIndex,
            task,
            index,
          },
        });
        state.activeBoard.columns[prevColIndex].tasks.splice(index, 1);
        state.activeBoard.columns[nextColIndex].tasks.splice(0, 0, task);
      }
    },
    updateTask: (state, action) => {
      const { task, colId, mode } = action.payload;

      const column = state.activeBoard.columns.find((col) => col.id === colId);
      const index = column.tasks.findIndex((t) => t.id === task.id);

      if (index === -1) column.tasks.splice(0, 0, task);
      else column.tasks.splice(index, 1, task);
    },
    updateBoard: (state, action) => {
      const { board, mode } = action.payload;

      if (mode === "personal") {
        const index = state.user.myBoards.findIndex((b) => b.id === board.id);
        if (index === -1) {
          state.user.myBoards.push(board);
          state.user.activeBoard =
            state.user.myBoards[state.user.myBoards.length - 1];
        } else state.user.myBoards.splice(index, 1, board);
        state.activeBoard = board;
      }
    },
    deleteBoard: (state, action) => {
      const id = action.payload;
      state.user.myBoards = state.user.myBoards.filter(
        (board) => board.id !== id
      );
      state.activeBoard = state.user.myBoards[0] || [];
    },
    deleteTask: (state, action) => {
      const { colId, taskId } = action.payload;
      const column = state.activeBoard.columns.find((col) => col.id === colId);
      column.tasks = column.tasks.filter((task) => task.id !== taskId);
    },
    setTheme: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  setBoard,
  setSubtaskStatus,
  setTaskColumn,
  updateTask,
  updateBoard,
  deleteBoard,
  deleteTask,
  setTheme,
} = userSlice.actions;

export default userSlice.reducer;
