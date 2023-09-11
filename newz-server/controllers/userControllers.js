import {Users} from "../models/Users.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"
import { sendToken } from "../utils/sendToken.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";


export const register = catchAsyncError(
    async (req, res, next) => {
        const { name, email, password } = req.body;
        const file = req.file;
        if (!name || !email || !password || !file) {
            return next(new ErrorHandler("Please add all fields", 400));
        }
        let user = await Users.findOne({ email });
        if (user) return next(new ErrorHandler("User already Exist", 409));

        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

        user = await Users.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        })
        sendToken(res, user, "Registered Successfully", 201);
    }
);


export const logout = catchAsyncError(
    async (req, res, next) => {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        }).json({
            success: true,
            message: "Logged Out Successfully",
        })
    }
);