import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({ news: [], users: [] }, {
    // Create Course
    createNewsRequest: (state) => {
        state.loading = true;
    },
    createNewsSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    createNewsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    // Clear error and message
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },

    // All News request
    myNewsRequest: (state) => {
        state.loading = true;
    },
    myNewsSuccess: (state, action) => {
        state.loading = false;
        state.news = action.payload;
    },
    myNewsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Delete News
    deleteNewsRequest: (state) => {
        state.loading = true;
    },
    deleteNewsSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload
    },
    deleteNewsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    // All Users request
    allUsersRequest: (state) => {
        state.loading = true;
    },
    allUsersSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload;
    },
    allUsersFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
});