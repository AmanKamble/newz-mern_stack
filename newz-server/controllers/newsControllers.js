import { News } from "../models/News.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"

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