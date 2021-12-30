import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const load = createAsyncThunk(
  'show/load',
  async function(showId) {
    let response = await axios.get('/api/shows/'+showId);
    return response.data.show;
  }
);

export const review = createAsyncThunk(
  'show/review',
  async function({showId, formData}) {
    let response = axios.post(
      `/api/shows/${showId}/reviews`, 
      formData, 
      {withCredentials:true}
    );
    return response.data;
  }
);

const showSlice = createSlice({
  name:"show",
  initialState:{
    loadStatus: "idle",
    loaded: null,
  },
  reducers: {
    clearLoadStatus: (state) => {
      state.loadStatus = "idle";
    },
    clearShow: (state) => {
      state.loaded = null;
    }
  }, 
  extraReducers: builder => {
    builder
      .addCase(load.pending, (state) => {
        state.loadStatus="loading";
      })
      .addCase(load.fulfilled, (state, action) => {
        state.loadStatus="success";
        state.loaded = action.payload;
      })
      .addCase(load.rejected, (state) => {
        state.loadStatus="failed";
      });
  }
});

export const {
  clearLoadStatus,
  clearShow
} = showSlice.actions;

export default showSlice.reducer;