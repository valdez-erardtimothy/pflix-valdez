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
    let response = await axios.post(
      `/api/shows/${showId}/reviews`, 
      formData, 
      {withCredentials:true}
    );
    return response.data.show;
  }
);

export const deleteReview = createAsyncThunk(
  'show/review/delete',
  async function({showId}) {
    let response = await axios.delete(
      `/api/shows/${showId}/reviews`,
      {withCredentials:true}
    );
    return response.data.show;
  }
);

const showSlice = createSlice({
  name:"show",
  initialState:{
    loadStatus: "idle",
    loaded: null,
    reviewStatus: "idle",
    deleteReviewStatus: "idle"
  },
  reducers: {
    clearLoadStatus: (state) => {
      state.loadStatus = "idle";
    },
    clearReviewStatus: (state) => {
      state.reviewStatus = "idle";
    },
    clearDeleteReviewStatus: (state) => {
      state.deleteReviewStatus = "idle";
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
      })
      .addCase(review.pending, (state) => {
        state.reviewStatus="loading";
      })
      .addCase(review.fulfilled, (state, action) => {
        state.reviewStatus="success";
        state.loaded = action.payload;
      })
      .addCase(review.rejected, (state) => {
        state.reviewStatus="failed";
      })
      .addCase(deleteReview.pending, (state) => {
        state.deleteReviewStatus="loading";
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.deleteReviewStatus="success";
        state.loaded = action.payload;
      })
      .addCase(deleteReview.rejected, (state) => {
        state.deleteReviewStatus="failed";
      });
  }
});

export const {
  clearLoadStatus,
  clearReviewStatus,
  clearDeleteReviewStatus,
  clearShow
} = showSlice.actions;

export default showSlice.reducer;