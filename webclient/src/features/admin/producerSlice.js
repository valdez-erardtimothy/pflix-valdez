import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const create = createAsyncThunk(
  'admin/producer/create', async(formData) => {
    let response =  await axios.post('/api/admin/producers', formData);
    return response.data;
  }
);

export const load = createAsyncThunk( 
  'admin/producer/load', async(id) => {
    let response = await axios.get('/api/admin/producers/'+id);
    return response.data;
  }
);

export const edit = createAsyncThunk( 
  'admin/producer/edit', async({id, formData}) => {
    let response = await axios.patch('/api/admin/producers/'+id, formData);
    return response.data;
  }
);

export const deleteProducer = createAsyncThunk(
  'admin/producer/delete', async(id) => {
    return await axios.delete ('/api/admin/producers/'+id);
  }
);

const producerSlice = createSlice({
  name:'admin/producer',
  initialState: {
    producer:null,
    deleted: null,
    loadStatus: "idle",
    createStatus: "idle",
    editStatus: "idle",
    deleteStatus: "idle"
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
    },
    clearEditStatus: (state) => {
      state.editStatus = "idle";
    },
    clearDeleteStatus: (state) => {
      state.deleteStatus = "idle";
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
      })
      .addCase(load.pending, (state)=> {
        state.loadStatus="pending";
      })
      .addCase(load.fulfilled, (state,action) => {
        state.loadStatus= "success";
        state.producer = action.payload.producer;
      })
      .addCase(load.rejected, (state, action) => {
        state.loadStatus="failed";
        console.debug('reject payload:', action.error);
      })
      .addCase(edit.pending, (state)=> {
        state.editStatus="pending";
      })
      .addCase(edit.fulfilled, (state,action) => {
        state.editStatus= "success";
        state.producer = action.payload.producer;
      })
      .addCase(edit.rejected, (state, action) => {
        state.editStatus="failed";
        console.debug('reject error:', action.error);
      })
      .addCase(deleteProducer.pending, (state)=> {
        state.deleteStatus="pending";
      })
      .addCase(deleteProducer.fulfilled, (state,action) => {
        state.deleteStatus= "success";
        state.producer = action.payload.producer;
      })
      .addCase(deleteProducer.rejected, (state, action) => {
        state.deleteStatus="failed";
        console.debug('reject error:', action.error);
      })
    ;
  }
});

export const {
  clearLoadStatus,
  clearLoaded,
  clearCreateStatus,
  clearEditStatus,
  clearDeleteStatus
} = producerSlice.actions;
export default producerSlice.reducer;