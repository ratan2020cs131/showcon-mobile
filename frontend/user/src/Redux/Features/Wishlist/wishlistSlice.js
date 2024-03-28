import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import wishlistApi from "./wishlistApi";

export const getWishlist = createAsyncThunk(
    'wishlist/get',
    async (data, thunkApi) => {
        try {
            const res = await wishlistApi.getWishlist();
            if (!res) {
                thunkApi.rejectWithValue("")
            }
            return res.movieId;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const addWishlist = createAsyncThunk(
    'wishlist/add',
    async (data, thunkApi) => {
        try {
            const res = await wishlistApi.addWishlist(data);
            if (!res) {
                thunkApi.rejectWithValue("")
            }
            return res;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const removeWishlist = createAsyncThunk(
    'wishlist/del',
    async (data, thunkApi) => {
        try {
            const res = await wishlistApi.removeWishlist(data);
            if (!res) {
                thunkApi.rejectWithValue("")
            }
            return res;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
)

const state = {
    getting: false,
    wishlist: [],
    adding: false,
    added: false,
    removing: false,
    removed: false
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: state,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getWishlist.pending, (state, action) => {
                state.getting = true;
                state.wishlist = []
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.getting = false;
                state.wishlist = action.payload
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.getting = false;
                state.wishlist = []
            })
            .addCase(addWishlist.pending, (state, action) => {
                state.adding = true;
                state.added = false
            })
            .addCase(addWishlist.fulfilled, (state, action) => {
                state.adding = false;
                state.added = true
            })
            .addCase(addWishlist.rejected, (state, action) => {
                state.adding = false;
                state.added = false
            })
            .addCase(removeWishlist.pending, (state, action) => {
                state.removing = true;
                state.removed = false
            })
            .addCase(removeWishlist.fulfilled, (state, action) => {
                state.removing = false;
                state.removed = true
            })
            .addCase(removeWishlist.rejected, (state, action) => {
                state.removing = false;
                state.removed = false
            })
    }
})

export default wishlistSlice.reducer;
export const { } = wishlistSlice.actions;