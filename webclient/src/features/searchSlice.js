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
    searched: [],
    searchStatus: "idle",
    displayed: [],
    itemsPerScroll:10,
    
  },
  reducers: {
    clearSearched: (state) => {
      state.searched = {};
    },
    clearSearchStatus: (state) => {
      state.searchStatus = "idle";
    },
    displayMore: (state) => {
      state.displayed = state.searched.slice(0,
        state.displayed.length+state.itemsPerScroll
      );
    },
    clearDisplayed: (state) => {
      state.displayed=[];
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
        state.displayed = state.searched.slice(0,state.itemsPerScroll);
      })
      .addCase(search.rejected, (state)=> {
        state.searchStatus = "failed";
      })
    ;
  }
});

export const {
  clearSearchStatus,
  clearSearched,
  displayMore,
  clearDisplayed
} = searchSlice.actions;

export default searchSlice.reducer;