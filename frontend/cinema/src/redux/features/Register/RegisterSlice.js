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

export const registerCinema = createAsyncThunk(
    'register/registerCinema',
    async (data, thunkAPI) => {
        try {
            const res = await RegisterApi.registerCinema(data);
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

export const getCinema = createAsyncThunk(
    'register/getCinema',
    async (thunkAPI) => {
        try {
            const res = await RegisterApi.getCinema();
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

const state = {
    gettingstatus: true,
    status: undefined,
    isGettingAdd: true,
    cinema: {
        title: '',
        address: null,
        type: [],
        screen: []
    },
    registered: null,
    isRegistered: false,
    isRegistering: false
}

const registerSlice = createSlice({
    name: "register",
    initialState: state,
    reducers: {
        setCinema: (state, action) => {
            const { key, value } = action.payload;
            const [property, index] = key.split('[');
            if (index) {
                const numericIndex = parseInt(index.replace(']', ''), 10);
                state.cinema[property][numericIndex] = value;
            } else {
                state.cinema[property] = value;
            }
        },
        resetNewCinema: (state, action) => {
            state.cinema.title = '';
            state.cinema.address = null;
            state.cinema.type = [];
            state.cinema.screen = []
        },
        resetCinema: (state, action) => {
            state.registered = null;
            state.isRegistered = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAddress.pending, (state, action) => {
                state.isGettingAdd = true;
                state.cinema.address = null
            })
            .addCase(getAddress.fulfilled, (state, action) => {
                state.isGettingAdd = false;
                state.cinema.address = action.payload
            })
            .addCase(registerCinema.pending, (state, action) => {
                state.isRegistering = true;
                state.isRegistered = false
            })
            .addCase(registerCinema.fulfilled, (state, action) => {
                state.isRegistering = false;
                state.isRegistered = true
            })
            .addCase(getCinema.pending, (state, action) => {
                state.gettingstatus = true;
                state.status = undefined
            })
            .addCase(getCinema.fulfilled, (state, action) => {
                state.gettingstatus = false;
                state.status = action.payload.isApproved;
                state.registered = action.payload;
            })


    }
})

export const { setCinema, resetCinema, resetNewCinema } = registerSlice.actions;
export const register = (state) => state.register;
export default registerSlice.reducer;