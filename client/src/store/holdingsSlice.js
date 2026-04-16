import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHoldings = createAsyncThunk(
  "holdings/fetchHoldings",
  async () => {
    const response = await axios.get("/api/holdings");
    return response.data;
  }
);

const holdingsSlice = createSlice({
  name: "holdings",
  initialState: {
    data: [],
    selected: {},
    loading: false,
    error: null,
  },
  reducers: {
    toggleHolding: (state, action) => {
      const index = action.payload;
      state.selected[index] = !state.selected[index];
    },
    toggleAll: (state, action) => {
      const allSelected = action.payload;
      state.data.forEach((_, index) => {
        state.selected[index] = allSelected;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHoldings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHoldings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHoldings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleHolding, toggleAll } = holdingsSlice.actions;
export default holdingsSlice.reducer;
