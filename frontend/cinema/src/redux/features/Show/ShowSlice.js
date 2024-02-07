import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ShowApi from './ShowApi';

export const searchMovie = createAsyncThunk(
    'show/searchMovie',
    async (param, thunkAPI) => {
        try {
            const res = ShowApi.searchApi(param);
            if (!res) {
                return thunkAPI.rejectWithValue(err);
            }
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)


const state = {
    searchingMovie: false,
    searchResult: null,
}


const ShowSlice = createSlice({
    name: 'show',
    initialState: state,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchMovie.pending, (state, action) => {
                state.searchingMovie = true;
                state.searchResult = null
            })
            .addCase(searchMovie.fulfilled, (state, action) => {
                state.searchingMovie = false;
                state.searchResult = action.payload;
            })
    }
})

export const { } = ShowSlice.actions;
export const show = (state) => state.show;
export default ShowSlice.reducer;