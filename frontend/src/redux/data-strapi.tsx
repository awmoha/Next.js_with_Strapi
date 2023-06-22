import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { DataState } from "interfaces/interfaces";
import { fetchDataFromFirebase } from "services/api";

const initialState: DataState = {
  data: [],
  isLoading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataFromFirebase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataFromFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataFromFirebase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || null;
      });
  },
});

export default dataSlice.reducer;
