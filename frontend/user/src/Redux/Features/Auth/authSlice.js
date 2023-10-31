import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from './authAPI';

export const signin = createAsyncThunk(
    "auth/signin",
    async(credentials, thunkAPI)=>{
        try{
            const res = await authApi.signin(credentials);
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
            .addCase(signin.pending, (state) => {
                state.isLoading = true
            })
    }
});

export const auth = (state)=>state.auth;
export default authSlice.reducer;
