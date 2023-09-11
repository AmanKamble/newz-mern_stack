import { News } from "../models/News.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const getAllNews = catchAsyncError(
    async (req, res, next) => {
        const keyward = req.query.keyward || "";
        const category = req.query.category || "";

        const news = await News.find({
            title: {
                $regex: new RegExp(keyward, "i"),
            },
            category: {
                $regex: new RegExp(category, "i"),
            },
        })
        res.status(200).json({
            success: true,
            news
        })
    }
);

export const createNews = catchAsyncError(async (req, res, next) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
        return next(new ErrorHandler("Please add all fields", 400));
    }
    
    const author = req.user.name;
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await News.create({
        title,
        content,
        category,
        poster: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        author
    })

    res.status(201).json({
        success: true,
        message: "News created successfully.",
    })
});
