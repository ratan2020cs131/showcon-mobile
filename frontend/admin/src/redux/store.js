import { configureStore } from '@reduxjs/toolkit';
import ActorSlice from './features/actor/ActorSlice';
import MovieSlice from './features/movie/MovieSlice';
import AuthSlice from './features/Auth/AuthSlice';
import CinemaSlice from './features/cinema/CinemaSlice';

const store  = configureStore({
  reducer:{
    auth:AuthSlice,
    actor:ActorSlice,
    movie:MovieSlice,
    cinema:CinemaSlice
  }  
});

export default store;