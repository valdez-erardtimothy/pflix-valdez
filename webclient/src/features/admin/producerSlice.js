import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const create = createAsyncThunk(
  'admin/producer/create', async(formData) => {
    let response =  await axios.post('/api/admin/producers', formData);
    return response.data;
  }
);

const producerSlice = createSlice({
  name:'admin/producer',
  initialState: {
    producer:null,
    deleted: null,
    loadStatus: "idle",
    createStatus: "idle",
  },
  reducers: {
    clearLoadStatus: (state)=> {
      state.loadStatus = "idle";
    },
    clearLoaded: (state) => {
      state.loaded = null;
    },
    clearCreateStatus: (state) => {
      state.createStatus = "idle";
    }
  },
  extraReducers: builder=> {
    builder
      .addCase(create.pending, (state)=> {
        state.createStatus="pending";
      })
      .addCase(create.fulfilled, (state,action) => {
        state.createStatus= "success";
        state.producer = action.payload.producer;
      })
      .addCase(create.rejected, (state, action) => {
        state.createStatus="failed";
        console.debug('reject payload:', action.error);
      });
  }
});

export const {
  clearLoadStatus,
  clearLoaded,
  clearCreateStatus
} = producerSlice.actions;
export default producerSlice.reducer;