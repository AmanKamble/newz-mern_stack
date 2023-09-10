import express from "express";
import { register } from "../controllers/userControllers.js";
import singleUpload from "../middlewares/multer.js";


const router = express.Router();

// Register 
router.route("/register").post(singleUpload, register);

export default router;
