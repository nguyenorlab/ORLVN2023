import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    // another reducer
  },
});

export default store;
