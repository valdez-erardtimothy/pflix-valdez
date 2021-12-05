import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import adminShowsReducer from './features/admin/showsSlice';
import adminshowReducer from './features/admin/showSlice';
import loadingReducer from './features/loadingSlice';
import authReducer from './features/authSlice';
let reducers = combineReducers({
  loading:loadingReducer,
  admin: combineReducers({
    shows:adminShowsReducer,
    show: adminshowReducer
  }),
  auth:authReducer 
});

// thunk is part of default middleware
export default configureStore({
  reducer:reducers,
});