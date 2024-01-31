import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addNewMovie = createAsyncThunk(
    'movie/addNewMovie',
    async(data, thunkApi)=>{
        try {
            let body = {
                title:data.title,
                primaryPoster:data.primaryPoster,
                secondaryPoster:data.secondaryPoster,
                duration:data.duration,
                description:data.description,
                genre:data.genre,
                casts: data.casts.map(item => item._id),
                release:data.release
            }
            console.log("add movie api cast: ", body);
        } catch (err) {
            return thunkApi.rejectWithValue(err.message);
        }
    }
)

const initialState = {
    newMovie: {
        title: '',
        genre: [],
        primaryPoster: null,
        secondaryPoster: [],
        duration: [],
        description: '',
        casts: [],
        release:null
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
        }
    },
    extraReducers: (builder) => {
        builder

    }
})

export const { setNewMovie } = movieSlice.actions;
export const movie = (state) => state.movie;
export default movieSlice.reducer;