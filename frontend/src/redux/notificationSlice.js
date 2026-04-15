import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
    },
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload;
        },
        markNotificationAsRead: (state, action) => {
            const index = state.notifications.findIndex(n => n._id === action.payload);
            if (index !== -1) {
                state.notifications[index].isRead = true;
            }
        }
    }
});

export const { setNotifications, markNotificationAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
