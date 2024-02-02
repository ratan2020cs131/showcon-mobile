import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './features/Auth/AuthSlice';
// import RegisterSlice from './features/Register/RegisterSlice';

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        // register: RegisterSlice,
    }
})

export default store;