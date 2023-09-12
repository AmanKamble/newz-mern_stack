import express from "express";
import {
    changePassword,
    getMyProfile,
    login,
    logout,
    register,
    updateProfile,
    updateProfilePicture
} from "../controllers/userControllers.js";
import singleUpload from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

// Register 
router.route("/register").post(singleUpload, register);
// logout 
router.route("/logout").get(logout);
// login
router.route("/login").post(login);
// get my profile
router.route("/me").get(isAuthenticated, getMyProfile);
// Change Password
router.route("/changepassword").put(isAuthenticated, changePassword);
// Update Profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);
// Update Profile Picture
router.route("/updateprofilepicture").put(isAuthenticated, singleUpload, updateProfilePicture);


export default router;
