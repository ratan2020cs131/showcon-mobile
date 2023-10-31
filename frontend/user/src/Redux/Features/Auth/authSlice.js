import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signin = createAsyncThunk(
    "auth/login",
    async(credentials, thunkAPI)=>{
        try{
            const res = await authApi.login(credentials);
            if(!res){
                return thunkAPI.rejectWithValue(error);    
            }
        }
        catch(err){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const state = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
    }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
