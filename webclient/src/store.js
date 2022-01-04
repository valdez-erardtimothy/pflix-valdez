import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import adminActorsReducer from './features/admin/actorsSlice';
import adminActorReducer from './features/admin/actorSlice';
import adminShowsReducer from './features/admin/showsSlice';
import adminshowReducer from './features/admin/showSlice';
import adminProducersReducer from './features/admin/producersSlice';
import adminProducerReducer from './features/admin/producerSlice';
import loadingReducer from './features/loadingSlice';
import authReducer from './features/authSlice';
import searchReducer from './features/searchSlice';
import showReducer from './features/showSlice';
import actorReducer from './features/actorSlice';
import showsReducer from './features/showsSlice';
import dashboardReducer from './features/admin/dashboardSlice';

let reducers = combineReducers({
  loading:loadingReducer,
  admin: combineReducers({
    actors: adminActorsReducer,
    actor: adminActorReducer,
    shows:adminShowsReducer,
    show: adminshowReducer,
    producers: adminProducersReducer,
    producer: adminProducerReducer,
    dashboard: dashboardReducer
  }),
  auth:authReducer,
  search:searchReducer,
  actor:actorReducer,
  show: showReducer,
  shows: showsReducer
});

// thunk is part of default middleware
export default configureStore({
  reducer:reducers,
});