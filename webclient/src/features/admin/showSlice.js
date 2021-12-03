import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchShowAdmin = createAsyncThunk(
  'admin.show/fetchShow', async(id)=> {
    let {data}= await axios.get('/api/admin/shows/'+id); 
    return data.show;
  }
);

export const deleteShow = createAsyncThunk(
  'admin.show/delete', async(id) => {
    let response = await axios.delete(`/api/admin/shows/${id}`);
    return response;
  }
);

const showSlice = createSlice({
  name: "admin/show",
  initialState: {
    loadedShowAdmin: {},
    showAdminLoadStatus: 'idle', // loading, successful, failed
    showAdminError: '',
    deleteShowStatus: 'idle',
    deleteResponse: {},
    deleteShowError: ''
  },
  reducers: {
    clearLoadedShowAdmin: (state)=>{
      state.loadedShowAdmin={};
    },
    clearDeleteShowStatus:(state) => {
      state.deleteShowStatus="idle";
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
      })
      .addCase(deleteShow.pending, (state)=>{
        state.deleteShowStatus = 'loading';
      })
      .addCase(deleteShow.fulfilled, (state,action) =>{
        state.deleteShowStatus = 'success';
        state.deleteResponse = action.payload;
      })
      .addCase(deleteShow.rejected, (state, action) => {
        state.deleteShowError = action.payload;
        state.deleteShowStatus = 'failed';
      });
  }
});

export const {clearLoadedShowAdmin ,clearDeleteShowStatus} = showSlice.actions;

export default showSlice.reducer;