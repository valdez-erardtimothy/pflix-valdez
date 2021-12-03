import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShowAdmin = createAsyncThunk(
  'admin.show/fetchShow', async(id)=> {
    let {data}= await axios.get('/api/admin/shows/'+id); 
    return data.show;
  }
);


const showSlice = createSlice({
  name: "admin/show",
  initialState: {
    loadedShowAdmin: {},
    showAdminLoadStatus: 'idle', // loading, successful, failed
    showAdminError: ''
  },
  reducers: {
    clearLoadedShowAdmin: (state)=>{
      state.loadedShowAdmin={};
    }
  },
  extraReducers: builder=>{
    builder
      .addCase(fetchShowAdmin.pending, (state)=>{
        state.showAdminLoadStatus = 'loading';
      })
      .addCase(fetchShowAdmin.fulfilled, (state,action) =>{
        state.showAdminLoadStatus = 'success';
        state.loadedShowAdmin = action.payload;
      })
      .addCase(fetchShowAdmin.rejected, (state, action) => {
        state.showAdminError = action.payload;
        state.showAdminLoadStatus = 'failed';
      });
  }
});

export const {clearLoadedShowAdmin} = showSlice.actions;

export default showSlice.reducer;