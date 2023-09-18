import { createReducer } from "@reduxjs/toolkit";

export const profileReducer = createReducer({}, {
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
});