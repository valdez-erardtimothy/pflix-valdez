import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const load = createAsyncThunk(
  'admin/producers/load',
  async()=> {
    let response = await axios.get('/api/admin/producers');
    return response.data;
  }
);

const producersSlice = createSlice({
  name: 'admin/producers',
  initialState: {
    producers: {},
    loadStatus: 'idle'
  },
  reducers: {
    clearLoaded: (state) => {
      state.producers = {};
    },
    clearLoadStatus:(state) => {
      state.loadStatus= "idle";
    }
  }, 
  extraReducers: builder => {
    builder
      .addCase(load.pending, (state) => {
        state.loadStatus = "loading";
      })
      .addCase(load.fulfilled, (state, action) => {
        state.loadStatus = "success";
        state.producers = action.payload.producers;
      })
      .addCase(load.rejected, (state) =>  {
        state.loadStatus = "failed ";
      });
  }
});

export const {clearLoaded, clearLoadStatus} = producersSlice.actions;

export default producersSlice.reducer;