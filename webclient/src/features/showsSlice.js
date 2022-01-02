import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const load = createAsyncThunk(
  'shows/load',
  async function(data,  {getState}) {
    let {showsPerPage, loaded} = getState().shows;
    let response = await axios.get(
      `/api/shows?skip=${loaded.length}&limit=${showsPerPage}`
    );
    return response.data;
  }
);

const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    loadStatus: "idle",
    loaded: [],
    showTotalCount: 0,
    showsPerPage:10
  }, 
  reducers: {
    clearLoadStatus: (state)=> {
      state.loadStatus = 'idle';
    },
    clearLoaded:(state)=> {
      state.loaded = [];
      state.showTotalCount = 0;
    }
  },
  extraReducers: builder=>{
    builder
      .addCase(load.pending, (state) => {
        state.loadStatus="loading";
      })
      .addCase(load.fulfilled, (state, action) => {
        state.loadStatus="success";
        state.loaded = state.loaded.concat(action.payload.shows);
        state.showTotalCount = action.payload.count;
      })
      .addCase(load.rejected, (state) => {
        state.loadStatus="failed";
      })
    ;
  }
});

export const {
  clearLoadStatus,
  clearLoaded
} = showsSlice.actions;

export default showsSlice.reducer;