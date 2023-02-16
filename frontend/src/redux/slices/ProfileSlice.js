import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

// createSlice is more convenient than the createAction and createReducer combo

// Version 1:
// First, create the thunk
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const response = await api('GET', 'current', {
      mode: 'cors',
    })
    console.log({ response })
    return response
  }
)

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async ({ body}) => {
    const response = await api('PUT', 'current', {
      mode: 'cors', body
    })
    console.log({ response })
    return response
  }
)
// createSlice is more convenient than the createAction and createReducer combo

// Version 1:


// ANY GET AND POST REQUEST WILL RESET REDUCER
export const slice = createSlice({
  name: 'profile',

  initialState: {

    profileDetails: {
      addressFirst: "",
      addressSecond: "",
      creditCardCVV: "",
      creditCardNumber: "",
      email: "",
      name: "",
      role: ""
    },

    isSignedIn: false,
  },

  reducers: {
    // Although it's written as reducers, it's better called action
    // [action1] exported as slice.actions.[action1]
    // ...action.payload (payload is the parameter sent) :       
    // Example in this slice file:      state.profileValues = { ...action.payload };
    // Example in actual js file:       setprofile({imageSrc: " ", profileName: "" ...})
    // What it does in the reducer:     state.profileValues= {imageSrc: " ", profileName: "" ...}

    setProfile: (state, action) => {
      // Will handle the action type `'profile/setprofile'`
      let object = action.payload;
      state.profileDetails = object;
      state.isSignedIn = true;
    },
    setProfileNull: (state) => {
      // Will handle the action type `'profile/setprofile'`
      state.profileDetails = {};
      state.isSignedIn = false;
    },
    setSignedIn: (state) => {
      // Will handle the action type `'profile/setprofile'`
      state.isSignedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      console.log({ payload })
      if (payload.success) {
        state.profileDetails = { ...payload.user }
        state.isSignedIn = true;
      }
    })
    builder.addCase(editProfile.fulfilled, (state, { payload }) => {
      console.log({ payload })
      if (payload.success) {
        state.profileDetails.totalPurchase = payload.user.totalPurchase 
        state.isSignedIn = true;
      }
    })
  }
  /*
    name, price, imageSrc, type, 
    inputs: rate, size, quantity
  */
},
);
// exporting the actions. Later imported as useDispatch([actionName]) ?? 95% SURE
export const { setProfile, setProfileNull, setSignedIn } = slice.actions;

// exporting the states. Later imported as useSelector([stateName])  ?? 95% SURE
export const selectProfileDetails = state => { return state.profile.profileDetails };
export const selectIsSignedIn = state => { return state.profile.isSignedIn };
// exporting the slice (combination of reducers, so more apt name should be slice.slice???) for combination in the store
export default slice.reducer;
