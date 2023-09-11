import express from "express";
import {
    getMyProfile,
    login,
    logout,
    register
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


export default router;
