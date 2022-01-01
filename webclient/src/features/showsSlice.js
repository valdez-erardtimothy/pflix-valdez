import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const load = createAsyncThunk(
  'shows/load',
  async function() {
    let response = await axios.get('/api/shows');
    return response.data;
  }
);

const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    loadStatus: "idle",
    loaded: [],
    showTotalCount: 0,
  }, 
  reducers: {
    clearLoadStatus: (state)=> {
      state.loadStatus = 'idle';
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
  clearLoadStatus
} = showsSlice.actions;

export default showsSlice.reducer;