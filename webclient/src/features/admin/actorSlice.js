import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; 

export const create = createAsyncThunk(
  'admin/actor/create', async(createActorData) => {
    return await axios.post('/api/admin/actors', createActorData);
  }
);

export const fetchActor = createAsyncThunk(
  'admin/actor/fetchActor', async(id) => {
    let {data} = await axios.get('/api/admin/actors/'+id);
    return data.actor;
  }
);

export const edit = createAsyncThunk(
  'admin/actor/edit', async({id, form}) => {
    let {data} = await axios.patch('/api/admin/actors/'+id, form);
    return data.actor;
  }
);

export const deleteActor = createAsyncThunk(
  'admin/actor/delete', async(id) => {
    let response = await axios.delete(`/api/admin/actors/${id}`);
    return response.data;
  }
);

const actorSlice = createSlice({
  name:"admin/actor",
  initialState:{
    loadedActor:{},
    deletedActor:{},
    status:"idle",
    error: '',
    createStatus:"idle",
    fetchStatus:"idle",
    editStatus:"idle",
    deleteStatus:"idle"
  }, 
  reducers: {
    clearFetchStatus: (state)=> { 
      state.fetchStatus = "idle";
    },
    clearCreateStatus: (state)=>{
      state.createStatus="idle";
    },
    clearEditStatus: (state)=>{
      state.editStatus="idle";
    },
    clearDeleteStatus: (state)=>{
      state.deleteStatus="idle";
    },
    clearDeleted: (state=>{
      state.deletedActor={};
    }),
    clearError: (state) => {
      state.error = '';
    }
  },  
  extraReducers: builder=> {
    builder
      .addCase(create.pending, (state)=>{
        state.createStatus = "loading";
      })
      .addCase(create.fulfilled, (state, action)=>{
        state.createStatus = "success";
        state.loadedActor = action.payload;
      })
      .addCase(create.rejected, (state, action)=>{
        state.createStatus = "failed";
        state.error = action.error;
      })
      .addCase(fetchActor.pending, (state)=>{
        state.fetchStatus = "loading";
      })
      .addCase(fetchActor.fulfilled, (state, action)=>{
        state.fetchStatus = "success";
        state.loadedActor = action.payload;
      })
      .addCase(fetchActor.rejected, (state, action)=>{
        state.fetchStatus = "failed";
        state.error = action.error;
      })
      .addCase(edit.pending, (state)=>{
        state.editStatus = "loading";
      })
      .addCase(edit.fulfilled, (state, action)=>{
        state.editStatus = "success";
        state.loadedActor = action.payload;
      })
      .addCase(edit.rejected, (state, action)=>{
        state.deleteStatus = "failed";
        state.error = action.error;
      })
      .addCase(deleteActor.pending, (state)=>{
        state.deleteStatus = "loading";
      })
      .addCase(deleteActor.fulfilled, (state, action)=>{
        state.deleteStatus = "success";
        state.deletedActor = action.payload.actor;
      })
      .addCase(deleteActor.rejected, (state, action)=>{
        state.editStatus = "failed";
        state.error = action.error;
      });
    
  }
});

export const {
  clearFetchStatus,
  clearError,
  clearCreateStatus,
  clearEditStatus,
  clearDeleteStatus,
  clearDeleted
} = actorSlice.actions;

export default actorSlice.reducer;