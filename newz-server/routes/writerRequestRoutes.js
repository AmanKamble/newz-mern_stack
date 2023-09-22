import express from "express";
import { createRequest } from "../controllers/writerRequestController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Create writer Request
router.route("/createrequest").post(isAuthenticated, createRequest);

export default router;