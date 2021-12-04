import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

/* 
slice thunks 
*/
export const fetchShowsAdmin = createAsyncThunk(
  'admin.shows/fetchShows', 
  async()=>{
    let response = await axios.get('/api/admin/shows/');
    console.debug("fetch show response:", response);
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
    showsAdminErrors: {},
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
    ;
  }
});




export const { removeFromList } = showsAdminSlice.actions;

export default showsAdminSlice.reducer;