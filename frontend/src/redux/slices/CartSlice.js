import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddProduct, DeleteProduct, EditProduct, FetchCart } from '../../api/cart';

export const addProduct = createAsyncThunk(
  'cart/addProduct',
  async ({ productId, body }, _thunkAPI) => {
    const response = await AddProduct(body, productId) 
    return response
  }
)

export const editProduct = createAsyncThunk(
  'cart/editProduct',
  async ({ productId, body }, _thunkAPI) => {
    const response = await EditProduct(body, productId)
    return response
  }
)

export const deleteProduct = createAsyncThunk(
  'cart/deleteProduct',
  async (deleteIndex, _thunkAPI) => {
    const response = await DeleteProduct(deleteIndex)
    return response
  }
)

export const fetchCart = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await FetchCart()
    return response
  }
)

const initialState = {
  cartValues: {
    // Redux needs immutale changes, but JS 2D arrays are diffucult to change immutably
    products: null,
    description: [{ quantity: 0, size: "" }],
    total: 0,
    paid: false
  },
  status: "idle",
  error: "",
}

export const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIndexQuantity: (state, action) => {
      let { index, value } = action.payload
      state.cartValues[index].quantity = value;
    },
    setDeleteQuantity: (state, action) => {
      let { index } = action.payload
      state.cartValues.splice(index, 1);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.cartValues = { ...payload.cart }
        state.status = "success"
      }
      else{
        state.status = "failed"
        if (payload.error) state.error = payload.error
      }
    })
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchCart.rejected, (state, { error }) => {
      state.status = "rejected"
      state.error = error
    })

    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.status = "success"
      }
      else{
        state.status = "failed"
        state.cartValues = { ...initialState.cartValues }
        if (payload.error) state.error = payload.error
      }
    })
    builder.addCase(addProduct.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(addProduct.rejected, (state, { error }) => {
      state.status = "rejected"
      state.error = error
    })

    builder.addCase(editProduct.fulfilled, (state, { payload }) => {
      if (payload.success) {
        let { cart } = payload
        state.status = "success";
        state.cartValues = {
          ...state.cartValues,
          description: [...cart.description],
        };
      }
      else{
        state.status = "failed"
        if (payload.error) state.error = payload.error
      }
    })
    builder.addCase(editProduct.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(editProduct.rejected, (state, { error }) => {
      state.status = "rejected"
      state.error = error
    })

    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      if (payload.success) {
        let { index } = payload
        index= parseInt(index)
        state.cartValues.products= state.cartValues.products.filter((_val, currIndex)=> index!== currIndex)
        state.cartValues.description= state.cartValues.description.filter((_val, currIndex)=> index!== currIndex)
      }
      else{
        state.status = "failed"
        if (payload.error) state.error = payload.error
      }
    })
    builder.addCase(deleteProduct.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(deleteProduct.rejected, (state, { error }) => {
      state.status = "rejected"
      state.error = error
    })
  }
})

export const { setCart, setIndexQuantity, setDeleteQuantity } = slice.actions;
export const selectCart = state => { return { ...state.cart.cartValues } };
export const selectCartStatus = state => { return state.cart.status  };
export const selectCartError = state => { return state.cart.error  };

export default slice.reducer;
