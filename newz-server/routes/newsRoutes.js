import express from "express";
import { getAllNews } from "../controllers/newsControllers.js";


const router = express.Router();

// Register 
router.route("/news").get(getAllNews);



export default router;
