import { configureStore } from '@reduxjs/toolkit';
import ActorSlice from './features/actor/ActorSlice';
import MovieSlice from './features/movie/MovieSlice';

const store  = configureStore({
  reducer:{
    actor:ActorSlice,
    movie:MovieSlice
  }  
});

export default store;