import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addNewMovie = createAsyncThunk({
    name:'movie/addNewMovie',
    async(data, thunkApi){
        try{

        }catch(err){
            return thunkApi.rejectWithValue(err.message);
        }
    }
})

const initialState = {
    newMovie:{
        title:'',
        genre:[],
        primaryPoster:null,
        secondaryPoster:[],
        duration:[],
        description:'',
        casts:[]
    }
}

const movieSlice = createSlice({
    name:'movie',
    initialState:initialState,
    reducers:{
        setNewMovie:(state,action)=>{
            state.newMovie[action.payload.key]=action.payload.value
        }
    },
    extraReducers:(builder)=>{
        builder

    }
})

export const {setNewMovie} = movieSlice.actions;
export const movie = (state)=>state.movie;
export default movieSlice.reducer;