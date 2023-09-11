import express from "express";
import {
    login,
    logout,
    register
} from "../controllers/userControllers.js";
import singleUpload from "../middlewares/multer.js";


const router = express.Router();

// Register 
router.route("/register").post(singleUpload, register);
// logout 
router.route("/logout").get(logout);
// login
router.route("/login").post(login);

export default router;
