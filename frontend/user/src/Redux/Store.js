import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Features/Auth/authSlice';
import movieSlice from './Features/Movie/movieSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    movie:movieSlice,
  },
});

export default store;
