import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
/* 
slice thunks 
*/
export const fetchActors = createAsyncThunk(
  'admin/actors/fetchActors', 
  async()=>{
    let response = await axios.get('/api/admin/actors/');
    return response.data.actors;
  }
);

const actorsSlice = createSlice({
  name:'admin/actors',
  initialState: {
    actors:{},
    errors: {},
    status: 'idle',
  },
  reducers: {
    removeFromList: (state, action) => {
      let actorToDelete = action.payload;
      // wrap in if statement to prevent error when actors is empty
      if(state.actors) {
        state.actors = state.actors.filter(
          actor=>actor._id!==actorToDelete._id
        ) || [];

      }
    },
    resetStatus: (state) => {
      state.status="idle";
    }
  }, 
  extraReducers: builder=> {
    builder
      .addCase(fetchActors.pending, (state)=>{
        state.status="loading";
        state.actors={};
      })
      .addCase(fetchActors.fulfilled, (state, action)=>{
        state.status = "success";
        state.actors= action.payload;        
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.errors = action.payload;
        state.status = 'failed';
      })
    ;
  }
});
export const { removeFromList, resetStatus } = actorsSlice.actions;

export default actorsSlice.reducer;