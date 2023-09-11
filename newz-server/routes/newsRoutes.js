import express from "express";
import { createNews, getAllNews } from "../controllers/newsControllers.js";
import { isAuthenticated, authorizedWriter } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Register 
router.route("/news").get(getAllNews);
// create new news - only admin and writer
router.route("/createnews").post(isAuthenticated, authorizedWriter, singleUpload, createNews);


export default router;
