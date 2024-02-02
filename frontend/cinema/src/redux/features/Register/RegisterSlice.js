import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAddress = createAsyncThunk(
    'register/getLocation',
    async (coordinates, thunkAPI) => {
        try {
            console.log(coordinates);
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