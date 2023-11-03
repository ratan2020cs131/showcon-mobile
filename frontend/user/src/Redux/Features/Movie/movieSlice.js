import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from "./movieAPI";

export const getMovie = createAsyncThunk("movie/id", async (thunkAPI) => {
  try {
    const res = await movieAPI.getMovies();
    if (!res) {
      return thunkAPI.rejectWithValue(error);
    }
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const getCinema = createAsyncThunk("movie/cinema", async (id,thunkAPI) => {
  try {
    const res = await movieAPI.getCinema(id);
    if (!res) {
      return thunkAPI.rejectWithValue(error);
    }
    return res;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const state = {
  isLoading: true,
  error: undefined,
  movies: undefined,
  cinema: undefined
};

const movieSlice = createSlice({
  name: "movie",
  initialState: state,
  reducers: {
    resetError: (state, action) => {
      state.error = undefined;
    },
    resetStates: (state, action) => {
      (state.isLoading = false), (state.error = undefined);
    },
    resetCinema: (state,action)=>{
      state.cinema=undefined,
      state.isLoading=true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        (state.isLoading = false), (state.movies = action.payload);
      })
      .addCase(getCinema.pending, (state, action)=>{
        state.isLoading=true
      })
      .addCase(getCinema.fulfilled, (state, action)=>{
        state.isLoading=false,
        state.cinema=action.payload
      })
  },
});

export const { resetError, resetStates, resetCinema } = movieSlice.actions;
export const movie = (state) => state.movie;
export default movieSlice.reducer;
