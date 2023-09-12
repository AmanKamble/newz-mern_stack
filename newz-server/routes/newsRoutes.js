import express from "express";
import { createNews, deleteNews, getAllNews, getMyNewz } from "../controllers/newsControllers.js";
import { isAuthenticated, authorizedWriter } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

// Get All News 
router.route("/news").get(getAllNews);
// Get My News 
router.route("/mynews").get(isAuthenticated, authorizedWriter, getMyNewz);
// create new news - only admin and writer
router.route("/createnews").post(isAuthenticated, authorizedWriter, singleUpload, createNews);
// Delete news - only admin and writer
router.route("/news/:id").delete(isAuthenticated, authorizedWriter, deleteNews);

export default router;
