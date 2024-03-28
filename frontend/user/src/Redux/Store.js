import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Features/Auth/authSlice';
import movieSlice from './Features/Movie/movieSlice';
import ticketSlice from './Features/Tickets/ticketSlice';
import wishlistSlice from './Features/Wishlist/wishlistSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    movie: movieSlice,
    ticket: ticketSlice,
    wishlist: wishlistSlice
  },
});

export default store;
