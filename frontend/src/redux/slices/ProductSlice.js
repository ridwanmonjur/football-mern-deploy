import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

// createSlice is more convenient than the createAction and createReducer combo

// Version 1:
// First, create the thunk
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
        console.log({hi: response})

        return response
    }
)


// ANY GET AND POST REQUEST WILL RESET REDUCER
export const product = createSlice({
    name: 'product',
    initialState: {
        products: [ {type: "accessories"}],
        currentProduct: {}
    },
    reducers: {
        // Although it's written as reducers, it's better called action
        // [action1] exported as slice.actions.[action1]
        // ...action.payload (payload is the parameter sent) :       
        // Example in this slice file:      state.productValues = { ...action.payload };
        // Example in actual js file:       setProduct({imageSrc: " ", productName: "" ...})
        // What it does in the reducer:     state.productValues= {imageSrc: " ", productName: "" ...}
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAll.fulfilled, (state, {payload}) => {
            // Add user to the state array
            state.products= [...payload.product]
        })
        builder.addCase(fetchProduct.fulfilled, (state, {payload}) => {
            console.log({payload})
            state.currentProduct= {...payload.product}
        })

    }
});
// exporting the actions. Later imported as useDispatch([actionName]) ?? 95% SURE
// export const {  } = slice.actions;

// exporting the states. Later imported as useSelector([stateName])  ?? 95% SURE
export const selectProducts = state => { return state.product.products };
export const selectCurrentProduct = state => { return state.product.currentProduct };

// exporting the slice (combination of reducers, so more apt name should be slice.slice???) for combination in the store
export default product.reducer;
