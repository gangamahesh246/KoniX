import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCapitalGains = createAsyncThunk(
  "capitalGains/fetchCapitalGains",
  async () => {
    const response = await axios.get("/api/capital-gains");
    return response.data.capitalGains;
  }
);

const capitalGainsSlice = createSlice({
  name: "capitalGains",
  initialState: {
    stcg: { profits: 0, losses: 0 },
    ltcg: { profits: 0, losses: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCapitalGains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCapitalGains.fulfilled, (state, action) => {
        state.loading = false;
        state.stcg = action.payload.stcg;
        state.ltcg = action.payload.ltcg;
      })
      .addCase(fetchCapitalGains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default capitalGainsSlice.reducer;
