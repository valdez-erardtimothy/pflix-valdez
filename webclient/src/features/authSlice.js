import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  "auth/login", async(formData)=> {
    const response = await axios.post(
      '/api/login', 
      formData,
      {withCredentials:true}
    );
    return response.data;
  }
);
// for fetching user on app load
export const loadUser = createAsyncThunk(
  "auth/load", async() => {
    const response = await axios.get(
      '/api/getAuthenticatedUser', {
        withCredentials:true
      });
    return response.data; 
  }
);

export const logout = createAsyncThunk(
  "auth/logout", async() => {
    return await axios.get('/api/logout');
  }
);
const authSlice = createSlice({
  name:"auth",
  initialState:{
    authenticatedUser: {},
    authenticated:false,
    loginAttemptStatus: "idle", //,loading,success,failed,
    loginAttemptError: "",
    loadStatus: '',
    loadError: '',
    logoutStatus: '',
    logoutError: {},
  },
  reducers:{
    clearLoginAttemptStatus: (state)=>{
      state.loginAttemptStatus="idle";
      state.loginAttemptError="";
    },
    clearLoadAttemptStatus: (state)=> { 
      state.loadStatus = "idle";
      state.loadError = "";
    },
    clearLogoutAttemptStatus:(state)=> {
      state.logoutStatus="idle",
      state.logoutError="";
    }
  },
  extraReducers: builder=>{
    builder
      .addCase(login.pending, (state) => { 
        state.loginAttemptStatus = "loading";
      })
      .addCase(login.fulfilled, (state,action) => { 
        state.loginAttemptStatus = "success";
        state.authenticated=true;
        state.authenticatedUser = action.payload.user;
      })
      .addCase(login.rejected, (state,action) => { 
        state.loginAttemptStatus = "failed";
        state.loginAttemptError = action.error;
      })
      .addCase(loadUser.pending, (state) => { 
        state.loadStatus = "loading";
      })
      .addCase(loadUser.fulfilled, (state,action) => { 
        state.loadStatus = "success";
        state.authenticated=true;
        state.authenticatedUser = action.payload.user;
      })
      .addCase(loadUser.rejected, (state,action) => { 
        state.loadStatus = "failed";
        state.authenticated=false;
        state.loadError = action.payload;
      }).addCase(logout.pending, (state) => { 
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state) => { 
        state.logoutStatus = "success";
        state.authenticated=false;
        state.authenticatedUser = {};
      })
      .addCase(logout.rejected, (state,action) => { 
        state.loadStatus = "failed";
        state.loadError = action.payload;
      });
  }
  
});

export const {
  clearLoginAttemptStatus,
  clearLogoutAttemptStatus
} = authSlice.actions;

export default authSlice.reducer; 