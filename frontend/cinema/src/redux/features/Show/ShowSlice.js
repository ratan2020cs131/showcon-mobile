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

export const addShow = createAsyncThunk(
    'show/addShow',
    async (data, thunkAPI) => {
        try {
            const res = ShowApi.addShow(data);
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
    creatingshow: false,
    showCreated: false,
    newShow: {
        movie: null,
        price: '',
        lang: [],
        slots: [],
        dates: []
    }
}


const ShowSlice = createSlice({
    name: 'show',
    initialState: state,
    reducers: {
        setNewShow: (state, action) => {
            const { key, value } = action.payload;
            state.newShow[key] = value;
        },
        resetNewShow: (state, action) => {
            state.newShow = {
                movie: null,
                price: '',
                lang: [],
                slots: [],
                dates: []
            };
            state.showCreated = false;
        },
    },
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
            .addCase(addShow.pending, (state, action) => {
                state.creatingshow = true;
                state.showCreated = false
            })
            .addCase(addShow.fulfilled, (state, action) => {
                state.creatingshow = false;
                state.showCreated = true;
            })
    }
})

export const { setNewShow, resetNewShow } = ShowSlice.actions;
export const show = (state) => state.show;
export default ShowSlice.reducer;