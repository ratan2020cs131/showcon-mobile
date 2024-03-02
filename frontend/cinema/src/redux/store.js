import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './features/Auth/AuthSlice';
import RegisterSlice from './features/Register/RegisterSlice';
import ShowSlice from './features/Show/ShowSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        register: RegisterSlice,
        show:ShowSlice
    }
})

export default store;