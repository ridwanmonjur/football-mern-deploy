import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddProductToCart, DeleteProduct, EditCartProduct, FetchCart } from '../../api/cart';
import {toast} from 'react-toastify'
export const addProduct = createAsyncThunk(
  'cart/addProduct',
  async ({ productId, body }, _thunkAPI) => {
    const response = await AddProductToCart(body, productId) 
    return response
  }
)

export const editProduct = createAsyncThunk(
  'cart/editProduct',
  async ({ productId, body }, _thunkAPI) => {
    const response = await EditCartProduct(body, productId)
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
  cartValues: null,
  total: 0,
  status: "idle",
  error: "",
}

export const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartNull : (state) => {
      state.cartValues = null
    },
    setIndexQuantity: (state, action) => {
      let { index, value } = action.payload
      state.cartValues[index].quantity = value;
    },
    setDeleteQuantity: (state, action) => {
      let { index } = action.payload
      state.cartValues.splice(index, 1);
    },
    setCartStatusIdle: (state) => {
      state.status = "idle"
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
        toast.dismiss()
        toast.success("Added product to cart!")
      }
      else{
        state.status = "failed"
        state.cartValues = { ...initialState.cartValues }
        if (payload.error) state.error = payload.error
        toast.dismiss()
        toast.error("Failed to add! Are you signed in as customer, and not as admin or seller?")
      }
    })
    builder.addCase(addProduct.pending, (state) => {
      state.status = "loading"
      // toast.info("Adding the product to cart...Hang on please!")
    })
    builder.addCase(addProduct.rejected, (state, { error }) => {
      state.status = "rejected"
      state.error = error
      toast.dismiss()
      toast.error("Failed to add! Are you signed in as customer, and not as admin or seller?")
    })

    builder.addCase(editProduct.fulfilled, (state, { payload }) => {
      if (payload.success) {
        let { cart } = payload
        state.status = "success";
        state.cartValues = {
          ...state.cartValues,
          description: [...cart.description],
          total: cart.total
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
        state.status = "success";
        index= parseInt(index)
        let total = state.cartValues.total - state.cartValues.description[index].subtotal
        let products = state.cartValues.products.filter((_val, currIndex)=> index!== currIndex)
        let description = state.cartValues.description.filter((_val, currIndex)=> index!== currIndex)
        state.cartValues = {
          ...state.cartValues,
          description: [...description],
          products: [...products],
          total
        };
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

export const { setCart, setIndexQuantity, setDeleteQuantity, setCartStatusIdle, setCartNull } = slice.actions;
export const selectCart = state => { return { ...state.cart.cartValues } };
export const selectCartStatus = state => { return state.cart.status  };
export const selectCartError = state => { return state.cart.error  };

export default slice.reducer;
