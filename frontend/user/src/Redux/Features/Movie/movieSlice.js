import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieAPI from './movieAPI';

export const getMovie = createAsyncThunk(
    "movie/id",
    async (thunkAPI) => {
        try {
            const res = await movieAPI.getMovies();
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
    isLoading: true,
    error: undefined,
    movies:undefined,
}

const movieSlice = createSlice({
    name: 'movie',
    initialState: state,
    reducers: {
        resetError: (state, action) => {
            state.error = undefined
        },
        resetStates: (state, action) => {
            state.isLoading= false,
            state.error= undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovie.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                state.isLoading = false,
                state.movies=action.payload
            })
    }
});

export const { resetError, resetStates } = movieSlice.actions;
export const movie = (state) => state.movie;
export default movieSlice.reducer;
