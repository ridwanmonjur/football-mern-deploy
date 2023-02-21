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
    error: null
  },
  reducers: {
    setProfile: (state, action) => {
      let object = action.payload;
      state.profileDetails = object;
      state.isSignedIn = true;
    },
    setProfileNull: (state) => {
      state.profileDetails = {};
      state.isSignedIn = false;
    },
    setSignedIn: (state) => {
      state.isSignedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, { payload }) => {
      if (payload.success ) {
        state.profileDetails = { ...payload.user }
        state.isSignedIn = true;
        state.status = "success";
      }
      else {
        state.isSignedIn = false;
        state.status = "failed";
      }
    })
    builder.addCase(fetchProfile.pending, (state, { payload }) => {
      state.status = "loading";
    })
    builder.addCase(fetchProfile.rejected, (state, { error }) => {
      state.profileDetails = "rejected";
      state.error = error
    })

    builder.addCase(editProfile.fulfilled, (state, { payload }) => {
      console.log({ payload })
      if (payload.success) {
        state.profileDetails = { ...payload.user }
        state.status = "success";
      }
      else {
        state.status = "failed";
      }
    })
    builder.addCase(editProfile.pending, (state, { payload }) => {
      state.status = "loading";
    })
    builder.addCase(editProfile.rejected, (state, { error }) => {
      state.profileDetails = "rejected";
      state.error = error
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
