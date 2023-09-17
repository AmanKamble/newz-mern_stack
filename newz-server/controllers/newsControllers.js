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

export const getMyNewz = catchAsyncError(
    async (req, res, next) => {
        const keyward = req.query.keyward || "";
        let news;
        if (req.user.role === "admin") {
            news = await News.find(
                {
                    title: {
                        $regex: new RegExp(keyward, "i"),
                    },
                }
            )
        } else {
            news = await News.find(
                {
                    title: {
                        $regex: new RegExp(keyward, "i"),
                    },
                }
            )
        }
        res.status(200).json({
            success: true,
            news
        });
    }
);

export const createNews = catchAsyncError(async (req, res, next) => {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
        return next(new ErrorHandler("Please add all fields", 400));
    }
    const author = req.user._id;
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

export const deleteNews = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) {
        return next(new ErrorHandler('News Not Found', 404));
    }
    // Delete course poster from Cloudinary
    await cloudinary.v2.uploader.destroy(news.poster.public_id);
    // Delete the course from the database
    await News.deleteOne({ _id: id });

    res.status(200).json({
        success: true,
        message: 'News deleted successfully.',
    });
});
