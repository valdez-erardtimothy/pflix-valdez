import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; 

export const create = createAsyncThunk(
  'admin/actor/create', async(createActorData) => {
    return await axios.post('/api/admin/actors', createActorData);
  }
);

const actorSlice = createSlice({
  name:"admin/actor",
  initialState:{
    loadedActor:{},
    status:"idle",
    error: '',
    createStatus:"idle",
    fetchStatus:"idle",
  }, 
  reducers: {
    clearCreateStatus: (state)=>{
      state.createStatus="idle";
    },
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
      });
    
  }
});

export const {clearError,clearCreateStatus} = actorSlice.actions;

export default actorSlice.reducer;