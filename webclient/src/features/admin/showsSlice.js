import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

/* 
slice thunks 
*/
export const fetchShowsAdmin = createAsyncThunk(
  'admin.shows/fetchShows', 
  async()=>{
    let response = await axios.get('/api/admin/shows/');
    return response.data.shows;
  }
);

export const fetchTitles = createAsyncThunk(
  'admin/shows/fetchTitles',
  async()=> {
    let response = await axios.get('/api/admin/show-titles');
    return response.data.shows;
  }
);

/* 
  slice for handling admin show list
*/
const showsAdminSlice = createSlice({
  name:"admin.shows",
  initialState: {
    showsAdmin: [],
    titles: [],
    showsAdminErrors: {},
    fetchTitleStatus: 'idle',
    showsAdminStatus: 'idle' //... loading, success, failed
  },
  reducers: {
    removeFromList: (state, action) => {
      let showToDelete = action.payload;
      state.showsAdmin = state.showsAdmin.filter(show => show._id !== showToDelete._id);
    }
  }, 
  extraReducers: builder=>{
    builder
      .addCase(fetchShowsAdmin.pending, (state)=>{
        state.showsAdminStatus="loading";
        state.showsAdmin={};
      })
      .addCase(fetchShowsAdmin.fulfilled, (state, action)=>{
        state.showsAdminStatus = "success";
        state.showsAdmin = action.payload;        
      })
      .addCase(fetchShowsAdmin.rejected, (state, action) => {
        state.showsAdminErrors = action.payload;
        state.showsAdminStatus = 'failed';
      })
      .addCase(fetchTitles.pending, (state) => {
        state.fetchTitleStatus = "loading";
      })
      .addCase(fetchTitles.fulfilled, (state,action) => {
        state.fetchTitleStatus = "success";
        state.titles = action.payload;
      })
      .addCase(fetchTitles.rejected, (state) => {
        state.fetchTitleStatus = "failed";
      })
    ;
  }
});




export const { removeFromList } = showsAdminSlice.actions;

export default showsAdminSlice.reducer;