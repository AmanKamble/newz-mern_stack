import express from "express";
import { createRequest, deleteWriterRequest, getAllWriterRequest } from "../controllers/writerRequestController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Create writer Request
router.route("/createrequest").post(isAuthenticated, createRequest);
// Create writer Request
router.route("/admin/deleterequest/:id").delete(isAuthenticated, authorizedAdmin, deleteWriterRequest);
// Get All Users
router.route("/admin/writerrequest").get(isAuthenticated, authorizedAdmin, getAllWriterRequest) ;

export default router;