import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from './authAPI';

export const signin = createAsyncThunk(
    "auth/signin",
    async (credentials, thunkAPI) => {
        try {
            const res = await authApi.signin(credentials);
            if (res !== true && res !== false) {
                return thunkAPI.rejectWithValue(error);
            }
            return res;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const verify = createAsyncThunk(
    "auth/verify",
    async (credentials, thunkAPI) => {
        try {
            const res = await authApi.verify(credentials);
            if (!res) {
                return thunkAPI.rejectWithValue(error);
            }
            if (res.token) {
                return res.token
            } else if (res.error) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",
    async (credentials, thunkAPI) => {
        try {
            const res = await authApi.register(credentials);
            if (!res) {
                return thunkAPI.rejectWithValue(error);
            }
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const getProfile = createAsyncThunk(
    "auth/profile",
    async (thunkAPI) => {
        try {
            const res = await authApi.getProfile();
            if (!res) {
                return thunkAPI.rejectWithValue(error);
            }
            return res;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

const state = {
    isLoading: false,
    isRegistered: undefined,
    isVerified: undefined,
    token: null,
    error: undefined,
    user:undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        resetError: (state, action) => {
            state.error = undefined
        },
        resetStates: (state, action) => {
            state.isLoading= false,
            state.isRegistered= undefined,
            state.isVerified= undefined,
            state.token= null,
            state.error= undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.isRegistered = action.payload,
                    state.isLoading = false
            })
            .addCase(verify.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isVerified = true,
                    state.token = action.payload
            })
            .addCase(verify.rejected, (state, action) => {
                state.isLoading = false,
                    state.isVerified = false,
                    state.error = action.payload
            })
            .addCase(register.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isVerified = true
            })
            .addCase(getProfile.fulfilled, (state, action)=>{
                state.user=action.payload
            })
    }
});

export const { resetError, resetStates } = authSlice.actions;
export const auth = (state) => state.auth;
export default authSlice.reducer;
