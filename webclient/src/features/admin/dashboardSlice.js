import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const load = createAsyncThunk(
  'admin/dashboard/load',
  async function() {
    let response = await axios.get('/api/admin/dashboard');
    return response;
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
  }
});


export default dashboardSlice.reducer;