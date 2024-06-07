// src/slices/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: 5000,
  result: null,
  bet: null,
  option: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    placeBet: (state, action) => {
      state.bet = action.payload.bet;
      state.option = action.payload.option;
    },
    setResult: (state, action) => {
      state.result = action.payload.result;
    },
    updatePoints: (state, action) => {
      state.points = action.payload;
    },
  },
});

export const { placeBet, setResult, updatePoints } = gameSlice.actions;
export default gameSlice.reducer;
