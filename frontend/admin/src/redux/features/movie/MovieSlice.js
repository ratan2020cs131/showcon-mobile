import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "./MovieApi";

export const addNewMovie = createAsyncThunk(
    'movie/addNewMovie',
    async (data, thunkApi) => {
        try {
            let body = {
                title: data.title,
                primaryPoster: data.primaryPoster,
                secondaryPoster: data.secondaryPoster,
                duration: data.duration,
                description: data.description,
                genre: data.genre,
                casts: data.casts.map(item => item._id),
                release: data.release
            }

            const res = await MovieApi.addNewMovie(body);
            if (!res) {
                return thunkApi.rejectWithValue(err.message);
            }
            return res;
        } catch (err) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
)


export const getTotalMovieCount = createAsyncThunk(
    'movie/getTotalMovieCount',
    async (thunkApi)=>{
        try{
            const res = await MovieApi.getTotalMovieCount();
            return res;
        }catch(err){
            return thunkApi.rejectWithValue(err.message);
        }
    }
)


const initialState = {
    isCreatingNewMovie: false,
    isMovieCreated: false,
    totalMovies:null,
    newMovie: {
        title: '',
        genre: [],
        primaryPoster: null,
        secondaryPoster: [],
        duration: [],
        description: '',
        casts: [],
        release: null
    }
}

const movieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {
        setNewMovie: (state, action) => {
            const { key, value } = action.payload;
            const [property, index] = key.split('[');
            if (index) {
                const numericIndex = parseInt(index.replace(']', ''), 10);
                state.newMovie[property][numericIndex] = value;
            } else {
                state.newMovie[property] = value;
            }
        },
        resetNewMovieState: (state, action) => {
            state.isCreatingNewMovie = false;
            state.isMovieCreated = false;
            let form = {
                title: '',
                genre: [],
                primaryPoster: null,
                secondaryPoster: [],
                duration: [],
                description: '',
                casts: [],
                release: null
            }
            state.newMovie = form
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewMovie.pending, (state, action) => {
                state.isCreatingNewMovie = true
                state.isMovieCreated = false
            })
            .addCase(addNewMovie.fulfilled, (state, action) => {
                state.isCreatingNewMovie = false,
                    state.isMovieCreated = true
            })
            .addCase(getTotalMovieCount.pending, (state, action)=>{
                state.totalMovies=null
            })
            .addCase(getTotalMovieCount.fulfilled, (state, action)=>{
                state.totalMovies=action.payload
            })
    }
})

export const { setNewMovie, resetNewMovieState } = movieSlice.actions;
export const movie = (state) => state.movie;
export default movieSlice.reducer;