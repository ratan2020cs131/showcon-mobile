import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RegisterApi from './RegisterApi';

export const getAddress = createAsyncThunk(
    'register/getLocation',
    async (coordinates, thunkAPI) => {
        try {
            const res = await RegisterApi.getAddress(coordinates);
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

const state = {
    address: null
}

const registerSlice = createSlice({
    name: "register",
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAddress.fulfilled, (state, action) => {
                state.address = action.payload
            })
    }
})

export const { } = registerSlice.actions;
export const register = (state) => state.register;
export default registerSlice.reducer;