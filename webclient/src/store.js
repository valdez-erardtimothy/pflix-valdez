import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import adminShowsReducer from './features/admin/showsSlice';
import loadingReducer from './features/loadingSlice';
let reducers = combineReducers({
  loading:loadingReducer,
  admin: combineReducers({
    shows:adminShowsReducer
  })
});

// thunk is part of default middleware
export default configureStore({
  reducer:reducers,
});