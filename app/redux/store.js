import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apisReducer from './slices/apiSlice';

const store = configureStore({
  reducer: combineReducers({
    apis: apisReducer,
  }),
});

export default store;
