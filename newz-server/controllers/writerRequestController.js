import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { WriterRequest } from "../models/writerRequest.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createRequest = catchAsyncError(async (req, res, next) => {
    const { message } = req.body;
    const { _id: userId, name, email, role } = req.user;
    
    // Check if a WriterRequest already exists for the user
    const existingRequest = await WriterRequest.findOne({ userId });
    if (existingRequest) {
        return next(new ErrorHandler('Request already exists', 400));
    }

    // Check if the user is an admin or writer and prevent them from sending a request
    if (role === "admin" || role === "writer") {
        return next(new ErrorHandler(`${role} cannot send requests to Be Writer`, 400));
    }
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

export const deleteWriterRequest = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    // Check if the provided id is a valid ObjectId
    const writerRequest = await WriterRequest.findById(id);
    if (!writerRequest) {
        return next(new ErrorHandler('Writer Request Not Found', 404));
    }
    await WriterRequest.deleteOne({ _id: id });
    res.status(200).json({
        success: true,
        message: 'Writer Request deleted successfully.',
    });
});


export const getAllWriterRequest = catchAsyncError(
    async (req, res, next) => {
        const writerRequests = await WriterRequest.find()
        res.status(200).json({
            success: true,
            writerRequests
        })
    }
);
