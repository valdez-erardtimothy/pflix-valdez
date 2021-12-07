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

export const register = createAsyncThunk(
  "auth/register", async(registerForm)=>{
    return await axios.post('/api/register',registerForm);
  }  
); 

const authSlice = createSlice({
  name:"auth",
  initialState:{
    authenticatedUser: {},
    authenticated:false,
    isAdmin:false,
    loginAttemptStatus: "idle", //,loading,success,failed,
    loginAttemptError: "",
    loadStatus: '',
    loadError: '',
    logoutStatus: '',
    logoutError: {},
    registerStatus:'idle',
    registerError:{},
  },
  reducers:{
    clearLoginAttemptStatus: (state)=>{
      state.loginAttemptStatus="idle";
      state.loginAttemptError="";
    },
    clearLogoutAttemptStatus:(state)=> {
      state.logoutStatus="idle",
      state.logoutError="";
    },
    clearRegisterStatus:(state)=> {
      state.registerStatus="idle",
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
        state.isAdmin=action.payload.user.isAdmin || false;
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
        state.isAdmin=action.payload.user.isAdmin;
        state.authenticatedUser = action.payload.user;
      })
      .addCase(loadUser.rejected, (state,action) => { 
        state.loadStatus = "failed";
        state.authenticated=false;
        state.loadError = action.payload;
      })
      .addCase(logout.pending, (state) => { 
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state) => { 
        state.logoutStatus = "success";
        state.authenticated=false;
        state.isAdmin = false;
        state.authenticatedUser = {};
      })
      .addCase(logout.rejected, (state,action) => { 
        state.loadStatus = "failed";
        state.loadError = action.payload;
      })
      .addCase(register.pending, (state) => { 
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state) => { 
        state.registerStatus = "success";
      })
      .addCase(register.rejected, (state,action) => { 
        state.registerStatus = "failed";
        state.registerError = action.error;
      });
  }
  
});

export const {
  clearLoginAttemptStatus,
  clearLogoutAttemptStatus,
  clearRegisterStatus,
} = authSlice.actions;

export default authSlice.reducer; 