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
    
    return {
      status:response.status,
      data:response.data
    };
  }
);

export const createShow = createAsyncThunk(
  'admin.show/create', async(createShowData) => {
    

    let response = await axios.post(`/api/admin/shows/`, createShowData);
    
    return {
      status:response.status,
      data:response.data
    };
  }
);

export const editShow = createAsyncThunk(
  'admin.show/edit', async({id, editShowData}) => {
    

    let response = await axios.patch(`/api/admin/shows/${id}`, editShowData);

    return {
      status:response.status,
      data:response.data
    };
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
    deleteShowError: '',
    editShowStatus: "idle",
    editShowResponse: {},
    editShowError: '',
    createShowStatus:'idle',
    createShowResponse: {},
    createShowError: ''
  },
  reducers: {
    clearLoadedShowAdmin: (state)=>{
      state.loadedShowAdmin={};
      state.showAdminLoadStatus="idle";
    },
    clearDeleteShowStatus:(state) => {
      state.deleteShowStatus="idle";
      state.deleteResponse = {};
    },
    clearEditShowStatus:(state)=> {
      state.editShowStatus = "idle";
      state.editShowResponse = {};
    },
    clearCreateShowStatus:(state)=> {
      state.createShowStatus = "idle";
      state.createShowResponse = {};
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
        state.editShowStatus = 'failed';
      })
      .addCase(editShow.pending, (state)=>{
        state.editShowStatus = 'loading';
      })
      .addCase(editShow.fulfilled, (state,action) =>{
        state.editShowStatus = 'success';
        state.editShowResponse = action.payload;
      })
      .addCase(editShow.rejected, (state, action) => {
        state.editShowError = action.payload;
        state.editShowStatus = 'failed';
      })
      .addCase(createShow.pending, (state)=>{
        state.createShowStatus = 'loading';
      })
      .addCase(createShow.fulfilled, (state,action) =>{
        state.createShowStatus = 'success';
        state.createShowResponse = action.payload;
      })
      .addCase(createShow.rejected, (state, action) => {
        state.createShowError = action.payload;
        state.createShowStatus = 'failed';
      });
  }
});

export const {
  clearLoadedShowAdmin,
  clearDeleteShowStatus, 
  clearEditShowStatus,
  clearCreateShowStatus
} = showSlice.actions;

export default showSlice.reducer;