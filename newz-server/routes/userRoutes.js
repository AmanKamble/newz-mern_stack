import express from "express";
import {
    changePassword,
    deleteUser,
    forgetPassword,
    getAllUsers,
    getMyProfile,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    updateProfilePicture,
    updateUserRole
} from "../controllers/userControllers.js";
import singleUpload from "../middlewares/multer.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js"

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
// Forget Password
router.route("/forgetpassword").post(forgetPassword);
// Reset Password
router.route("/resetpassword/:token").put(resetPassword);

// Admin routes
// Get All Users
router.route("/admin/users").get(isAuthenticated, authorizedAdmin, getAllUsers) ;
// Upade role and delete user
router.route("/admin/user/:id").put(isAuthenticated, authorizedAdmin, updateUserRole).delete(isAuthenticated, authorizedAdmin, deleteUser);


export default router;
