import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentComment: null,
  loading: false,
  error: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentStart: (state) => {
      state.loading = true;
    },
    commentSuccess: (state, action) => {
      state.loading = false;
      state.currentComment = action.payload;
    },
    commentFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    
      
  },
});

export const { commentStart, commentSuccess, commentFailure } =
  commentSlice.actions;

export default commentSlice.reducer;