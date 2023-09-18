import { createReducer } from "@reduxjs/toolkit";

export const profileReducer = createReducer({}, {
    // Updated Profile Picture 
    updateProfilePictureRequest: (state) => {
        state.loading = true;
    },
    updateProfilePictureSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfilePictureFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

     // Updated Profile 
     updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfileFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // Change Password  
    changePasswordRequest: (state) => {
        state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    changePasswordFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
});