import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const search = createAsyncThunk(
  'search/search',
  async function (urlParams) {
    let response = await axios.get('/api/search' + urlParams);
    return response.data;
  }
);

const searchSlice = createSlice({
  name: "/search",
  initialState: {
    searched: {},
    searchStatus: "idle",
  },
  reducers: {
    clearSearched: (state) => {
      state.searched = {};
    },
    clearSearchStatus: (state) => {
      state.searchStatus = "idle";
    }
  },
  extraReducers: builder => {
    builder
      .addCase(search.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(search.fulfilled, (state,action) => {
        state.searchStatus = "success";
        state.searched = action.payload?.results;
      })
      .addCase(search.rejected, (state)=> {
        state.searchStatus = "failed";
      })
    ;
  }
});

export const {
  clearSearchStatus,
  clearSearched
} = searchSlice.actions;

export default searchSlice.reducer;