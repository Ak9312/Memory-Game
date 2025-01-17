import { createSlice } from "@reduxjs/toolkit";
import { getShuffledIconsList, iconsList } from "./constansts";
const initialState = {
  value: Array(16).fill(null), // 4x4 grid initialized with null values
  flippedIndices: [], // to keep track of flipped cards
  matchedIndices: [], // to keep track of matched cards
  icons: [], // to keep track of icon
  isGameWon: false, // to keep track if game is won
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    gridInitialize: (state) => {
      state.value = Array(16).fill(null);
      state.flippedIndices = [];
      state.matchedIndices = [];
      state.icons = iconsList;
      state.isGameWon = false;
    },
    shuffleGrid: (state) => {
      const cards = [];
      for (let i = 0; i <= 7; i++) {
        cards.push(i, i);
      }
      state.value = cards.sort(() => Math.random() - 0.5);
      state.icons = getShuffledIconsList();
      state.flippedIndices = [];
      state.matchedIndices = [];
      state.isGameWon = false;
    },
    flipCard: (state, action) => {
      const index = action.payload;
      if (
        state.flippedIndices.length < 2 &&
        !state.flippedIndices.includes(index) &&
        !state.matchedIndices.includes(index)
      ) {
        state.flippedIndices.push(index);
      }
    },
    checkMatch: (state) => {
      if (state.flippedIndices.length === 2) {
        const [firstIndex, secondIndex] = state.flippedIndices;
        if (state.value[firstIndex] === state.value[secondIndex]) {
          state.matchedIndices.push(firstIndex, secondIndex);
          if (state.matchedIndices.length === state.value.length) {
            state.isGameWon = true;
          }
        }
        state.flippedIndices = [];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { gridInitialize, shuffleGrid, flipCard, checkMatch } =
  gridSlice.actions;

export default gridSlice.reducer;
