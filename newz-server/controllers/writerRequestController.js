import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { WriterRequest } from "../models/writerRequest.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createRequest = catchAsyncError(async (req, res, next) => {
    const { message } = req.body;
    const { _id: userId, name, email } = req.user;
    if (!name || !email || !message) {
        return next(new ErrorHandler("Please add all fields", 400));
    }
    await WriterRequest.create({
        name,
        email,
        message,
        userId,
    });
    res.status(201).json({
        success: true,
        message: "Writer request created successfully.", 
    });
});

