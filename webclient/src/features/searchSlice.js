import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const search = createAsyncThunk(
  'search',
  function (urlParams) {
    axios.get('/api/search' + urlParams);

  }
);

const searchShowSlice = createSlice({
  name: "/shows/search",
  initialState: {
    searched: {},
    searchStatus: "idle",
  },
  extraReducers: builder => {
    builder
      .addCase(search.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(search.fulfilled, (state) => {
        state.searchStatus = "success";
      })
      .addCase(search.rejected, (state)=> {
        state.searchStatus = "failed";
      })
    ;
  }
});

export default searchShowSlice.reducer;