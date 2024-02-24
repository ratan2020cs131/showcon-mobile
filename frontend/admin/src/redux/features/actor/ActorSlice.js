import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ActorApi from './ActorApi.js';

export const addActor = createAsyncThunk(
    'actor/add',
    async(data, thunkApi)=>{
        try{
            const res = await ActorApi.addNewActor(data);
            if(!res){
                return thunkApi.rejectWithValue(err.message);
            }
            console.log(res);
            return res;
        }catch(err){
            return thunkApi.rejectWithValue(err.message);
        }
    }
)

export const getActors = createAsyncThunk(
    'actor/get',
    async(data, thunkApi)=>{
        try{
            const res = await ActorApi.getActors();
            if(!res){
                return thunkApi.rejectWithValue(err.message);
            }
            return res;
        }catch(err){
            return thunkApi.rejectWithValue(err.message);
        }
    }
)

const initialState = {
    actors:[],
    isLoading:false,
    isAdded:false,
    newActor:null
}

const actorSlice = createSlice({
    name:'actor',
    initialState:initialState,
    reducers:{
        resestAddNewActor:(state, action)=>{
            state.isAdded=false,
            state.isLoading=false
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(addActor.pending, (state, action)=>{
            state.isLoading=true,
            state.isAdded=false,
            state.newActor=null
        })
        .addCase(addActor.fulfilled, (state, action)=>{
            state.isLoading=false,
            state.isAdded=true,
            state.newActor=action.payload
        })
        .addCase(getActors.pending, (state, action)=>{
            state.isLoading=true,
            state.actors=null
        })
        .addCase(getActors.fulfilled, (state, action)=>{
            state.isLoading=false,
            state.actors=action.payload
        })
    }
})

export const { resestAddNewActor } = actorSlice.actions;
export const actor = (state)=>state.actor;
export default actorSlice.reducer;
