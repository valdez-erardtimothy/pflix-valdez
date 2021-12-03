import { createSlice } from "@reduxjs/toolkit";

let loadingSlice = createSlice({
  name:"loading",
  initialState:{status: false},
  reducers: {
    endLoad: state=>{state.status=false;},
    startLoad: state=>{state.status=true;}
  }
});

export const {endLoad, startLoad} = loadingSlice.actions;

export default loadingSlice.reducer;