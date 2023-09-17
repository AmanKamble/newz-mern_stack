import { createReducer } from "@reduxjs/toolkit"

export const newsReducer = createReducer({ news: [] }, {
    // All News request
    allNewsRequest: (state) => {
        state.loading = true;
    },
    allNewsSuccess: (state, action) => {
        state.loading = false;
        state.news = action.payload;
    },
    allNewsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Clear error and message
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
});
