import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

// createSlice is more convenient than the createAction and createReducer combo

export const fetchAll = createAsyncThunk(
    'product/fetchAllStatus',
    async (productType) => {
        const response = await api('GET', `product/type/${productType}`, {
            mode: 'cors',
        })
        return response
    }
)

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (productId) => {
        const response = await api('GET', `product/${productId}`, {
            mode: 'cors',
        })
        return response
    }
)

export const product = createSlice({
    name: 'product',
    initialState: {
        products: [],
        status: "idle",
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, { payload }) => {
            state.products = [...payload.product]
            state.status = "success"
        })
        builder.addCase(fetchAll.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchAll.rejected, (state, { error }) => {
            state.status = "failed"
            state.error = error.message
        })
    }
});

export const selectProducts = state => { return state.product.products };
export const selectStatusProduct = state => { return state.product.status };
export const selectErrorProduct = state => { return state.product.error };
export default product.reducer;
