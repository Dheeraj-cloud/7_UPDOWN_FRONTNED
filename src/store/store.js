// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../slices/gameSlice";
import authReducer from "../slices/authSlice";
const store = configureStore({
  reducer: {
    game: gameReducer,
    auth: authReducer,
  },
});

export default store;
