import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketAPI from './ticketAPI';


export const createTicket = createAsyncThunk("ticket/create", async (data, thunkAPI) => {
    try {
        const res = await ticketAPI.createTicket(data);
        if (!res) {
            return thunkAPI.rejectWithValue(error);
        }
        return res;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

const state = {
    isLoading: false,
    error: undefined,
    ticket: undefined
};


const ticketSlice = createSlice({
    name: "ticket",
    initialState: state,
    reducers: {
        resetError: (state, action) => {
            state.error = undefined;
        },
        resetStates: (state, action) => {
            state.isLoading = false,
                state.error = undefined
        },
        resetTicket: (state, action) => {
            state.ticket = undefined,
                state.isLoading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ticket = action.payload
            })
    },
});

export const { resetError, resetStates, resetTicket } = ticketSlice.actions;
export const ticket = (state) => state.ticket;
export default ticketSlice.reducer;
