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
    ;
  }
});

export default actorSlice.reducer;