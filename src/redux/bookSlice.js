import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBook: null,
  loading: false,
  error: false,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentBook = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } =
  bookSlice.actions;

export default bookSlice.reducer;