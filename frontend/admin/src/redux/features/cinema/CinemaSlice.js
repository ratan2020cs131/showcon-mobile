import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CinemaApi from "./CinemaApi";

export const getTotalCinemaCount = createAsyncThunk(
    'cinema/getTotalCinemaCount',
    async (thunkApi)=>{
        try{
            const res = await CinemaApi.getTotalCinemaCount();
            return res;
        }catch(err){
            return thunkApi.rejectWithValue(err.message);
        }
    }
)

export const getNewCinema = createAsyncThunk(
    'cinema/getNewCinema',
    async (thunkApi)=>{
        try{
            const res = await CinemaApi.getNewCinema();
            return res;
        }catch(err){
            return thunkApi.rejectWithValue(err.message);
        }
    }
)

const states = {
    newCinemas: null,
    totalCinemas:null,
}

const CinemaSlice = createSlice({
    name: 'cinema',
    initialState: states,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getNewCinema.pending, (state, action)=>{
            state.newCinemas=null
        })
        .addCase(getNewCinema.fulfilled, (state, action)=>{
            state.newCinemas=action.payload
        })
        .addCase(getTotalCinemaCount.pending, (state, action)=>{
            state.totalCinemas=null
        })
        .addCase(getTotalCinemaCount.fulfilled, (state, action)=>{
            state.totalCinemas=action.payload
        })

    }
})

export const { } = CinemaSlice.actions;
export const cinema = (state) => state.cinema;
export default CinemaSlice.reducer;