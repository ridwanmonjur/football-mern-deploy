import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

// createSlice is more convenient than the createAction and createReducer combo

// Version 1:
// First, create the thunk
export const addProduct = createAsyncThunk(
  'cart/addProduct',
  async ({ productId, body }, thunkAPI) => {
    const response = await api('POST', `user/cart/product/${productId}`, {
      mode: 'cors', body
    })
    return response
  }
)

export const editProduct = createAsyncThunk(
  'cart/editProduct',
  async ({ productId, body, index }, thunkAPI) => {
    const response = await api('PUT', `user/cart/product/${productId}`, {
      mode: 'cors', body
    })
    return response
  }
)

export const deleteProduct = createAsyncThunk(
  'cart/deleteProduct',
  async (deleteIndex, thunkAPI) => {
    const response = await api('DELETE', `user/cart/delete/${deleteIndex}`, {
      mode: 'cors'
    })
    return response
  }
)


export const fetchCart = createAsyncThunk(
  'product/fetchProduct',
  async () => {
    const response = await api('GET', `cart/projection/cart`, {
      mode: 'cors',
    })
    return response
  }
)



// ANY GET AND POST REQUEST WILL RESET REDUCER
export const slice = createSlice({
  name: 'cart',
  // A slice is a combination of reducers
  // Slice's name is cart slice and state can be accessed by state.cart
  // state has 2 objects: state.sesiSemesterValues

  // Creates state also by initialState

  // Actions:
  // Action has type and payload
  // action type is "[sliceName]/[reducerPropertyName]"

  initialState: {
    cartValues: {
      // redux can't go very deep. may need to change backend
      products: [null],
      description: [{ quantity: 0, size: "" }],
      total: 0,
      paid: false
    },
  },

  reducers: {
    // Although it's written as reducers, it's better called action
    // [action1] exported as slice.actions.[action1]
    // ...action.payload (payload is the parameter sent) :       
    // Example in this slice file:      state.cartValues = { ...action.payload };
    // Example in actual js file:       setCart({imageSrc: " ", cartName: "" ...})
    // What it does in the reducer:     state.cartValues= {imageSrc: " ", cartName: "" ...}


    /*
      name, price, imageSrc, type, 
      inputs: rate, size, quantity
    */
    setIndexQuantity: (state, action) => {
      // Will handle the action type `'cart/setIndexQuantity'`
      // dispatch(setIndexQuantity(index, value))
      // NOT:
      // dispatch(setIndexQuantity(idx, newValue))

      let { index, value } = action.payload
      state.cartValues[index].quantity = value;
    },
    setDeleteQuantity: (state, action) => {
      // Will handle the action type `'cart/setIndexQuantity'`
      let { index } = action.payload
      // state.cartValues= state.cartValues.splice(index, 1);
      state.cartValues.splice(index, 1);
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCart.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.cartValues = { ...payload.cart }
      }
    })
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.cartValues = { ...payload.cart }
      }
    })
    builder.addCase(editProduct.fulfilled, (state, { payload }) => {
      if (payload.success) {
        let { cart } = payload
        state.cartValues = {
          ...state.cartValues,
          description: [...cart.description],
        }
      }
    })
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      if (payload.success) {
        let { index } = payload
        index= parseInt(index)
        state.cartValues.products= state.cartValues.products.filter((val, currIndex)=> index!== currIndex)
        state.cartValues.description= state.cartValues.description.filter((val, currIndex)=> index!== currIndex)
      }
    })
  }
})

// exporting the actions. Later imported as useDispatch([actionName]) ?? 95% SURE
export const { setCart, setIndexQuantity, setDeleteQuantity } = slice.actions;

// exporting the states. Later imported as useSelector([stateName])  ?? 95% SURE
export const selectCart = state => { return { ...state.cart.cartValues } };

// exporting the slice (combination of reducers, so more apt name should be slice.slice???) for combination in the store
export default slice.reducer;
