import { createSlice } from '@reduxjs/toolkit';

// ANY GET AND POST REQUEST WILL RESET REDUCER
export const notification = createSlice({
    name: 'notification',
    initialState: {
        notificationStatusValues: "inactive" // spinner, success, success
    },
    reducers: {
        setNotificationStatus: (state, action) => {
            let { status } = action.payload
            state.notificationStatusValues = status;
        },
    },

});

export const { setNotificationStatus } = notification.actions;
export const selectNotifications = state => { return state.notification.notificationStatusValues };

export default notification.reducer;
