import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from './authAPI';

export const signin = createAsyncThunk(
    "auth/signin",
    async(credentials, thunkAPI)=>{
        try{
            const res = await authApi.signin(credentials);
            if(res!==true&&res!==false){
                return thunkAPI.rejectWithValue(error);    
            }
            console.log("res:", res)
            return res;
        }
        catch(err){
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const state = {
    isRegistered:undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signin.fulfilled, (state, action) => {
                state.isRegistered = action.payload
            })
    }
});

export const auth = (state)=>state.auth;
export default authSlice.reducer;
