import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const load = createAsyncThunk(
  'admin/dashboard/load',
  async function() {
    let response = await axios.get('/api/admin/dashboard');
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: "admin/dashboard",
  initialState: {
    showCount: 0, 
    tvCount: 0,
    movieCount: 0,
    topActors: [],
    topMovies: [],
    topTv: [],
    popularMovieGenre: [],
    popularTvGenre: [],
    topGrossingMovie: [],
    topGrossingTv: [],
    loadStatus:"idle"
  },
  reducers: {
    clearLoadStatus: (state) => {
      state.loadStatus = "idle";
    }
  },
  extraReducers: builder=> {
    builder
      .addCase(load.pending, (state) => {
        state.loadStatus="loading";
      })
      .addCase(load.fulfilled, (state, action) => {
        state.loadStatus="success";
        let data = action.payload;
        state.showCount = data.showCount.total;
        state.tvCount = data.showCount.tv;
        state.movieCount = data.showCount.movie;
        state.topActors = data.topActors;
        state.topMovies = data.topMovies;
        state.topTv = data.topTv;
        state.popularTvGenre = data.tvGenreRanking; 
        state.popularMovieGenre = data.movieGenreRanking;
        state.topGrossingMovie = data.topMovieGross;
        state.topGrossingTv = data.topTvGross;
      }) 
      .addCase(load.rejected, (state) => {
        state.loadStatus="failed";
      });
  }
});

export const {
  clearLoadStatus
} = dashboardSlice.actions;
export default dashboardSlice.reducer;