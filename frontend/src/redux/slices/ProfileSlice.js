import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetProfile, EditProfile } from '../../api/profile';

// createSlice is more convenient than the createAction and createReducer combo

// Version 1:
// First, create the thunk
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const response = GetProfile()
    return response
  }
)

export const editProfile = createAsyncThunk(
  'profile/editProfile',
  async ({ body }) => {
    const response = await EditProfile(body)
    return response
  }
)
// createSlice is more convenient than the createAction and createReducer combo

export const slice = createSlice({
  name: 'profile',
  initialState: {
    profileDetails: null,
    isSignedIn: false,
    status: "idle",
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profileDetails = action.payload;
      state.isSignedIn = true;
      state.error = null;
    },
    setProfileNull: (state) => {
      state.profileDetails = null;
      state.isSignedIn = false;
    },
    setSignedIn: (state) => {
      state.isSignedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      if ( payload.success === true && 'user' in payload && payload?.user!= null ) {
        state.profileDetails = { ...payload.user }
        state.isSignedIn = true;
        state.status = "success";
      }
      else {
        state.isSignedIn = false;
        state.profileDetails = null;
        state.status = "failed";
        state.error= "Couldn't retrieve user";
      }
    })
    builder.addCase(fetchProfile.pending, (state, { payload }) => {
      state.status = "loading";
    })
    builder.addCase(fetchProfile.rejected, (state, { error }) => {
      state.profileDetails = "rejected";
      state.isSignedIn = false;
      state.status = "failed";
      state.error = error
    })

    builder.addCase(editProfile.fulfilled, (state, { payload }) => {
      if (payload.success  && 'user' in payload && payload?.user!= null ) {
        state.profileDetails = { ...payload.user }
        state.status = "success";
      }
      else {
        state.status = "failed";
        state.error= "Couldn't retrieve user";
      }
    })
    builder.addCase(editProfile.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(editProfile.rejected, (state, { error }) => {
      state.error = error
      state.status = "failed";
    })
  }
  },
);
export const { setProfile, setProfileNull, setSignedIn } = slice.actions;
export const selectProfileDetails = state => { return state.profile.profileDetails };
export const selectIsSignedIn = state => { return state.profile.isSignedIn };
export const selectErrorProfile = state => { return state.profile.error };
export const selectStatusProfile = state => { return state.profile.status };
export default slice.reducer;
