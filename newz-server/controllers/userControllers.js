import { Users } from "../models/Users.js"
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"
import { sendToken } from "../utils/sendToken.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from 'crypto';


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

export const login = catchAsyncError(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please add all fields", 400));
        }
        const user = await Users.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Incurrect Email or Password", 401));

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return next(new ErrorHandler("Incurrect Email or Password", 401));

        sendToken(res, user, `Welcome back ${user.name}`, 200);
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

export const getMyProfile = catchAsyncError(
    async (req, res, next) => {
        const user = await Users.findById(req.user._id);

        res.status(200).json({
            success: true,
            user,
        })
    }
);

export const changePassword = catchAsyncError(
    async (req, res, next) => {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please add all fields", 400));
        }
        const user = await Users.findById(req.user._id).select("+password");
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return next(new ErrorHandler("Incorrect Old Password", 400));
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        })
    }
);

export const updateProfile = catchAsyncError(
    async (req, res, next) => {
        const { name, email } = req.body;
        const user = await Users.findById(req.user._id);
        
        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
        })
    }
);

export const updateProfilePicture = catchAsyncError(
    async (req, res, next) => {
        const user = await Users.findById(req.user._id);

        const file = req.file;
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile Picture Updated Successfully",
        })
    }
);

export const forgetPassword = catchAsyncError(
    async (req, res, next) => {
        const { email } = req.body;
        if (!email) {
            return next(new ErrorHandler("Please Enter Email", 400));
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User dose not exist", 400));
        }

        const resetToken = await user.getResetToken();

        await user.save();

        // send token via email
        const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
        const message = `Click on thelink to reset your password. ${url}. If you have not request then please ignore.`;
        await sendEmail(user.email, "NewZ APP - Reset Password", message);

        res.status(200).json({
            success: true,
            message: `Reset token has been sent to ${user.email}`,
        })
    }
);

export const resetPassword = catchAsyncError(
    async (req, res, next) => {
        const { token } = req.params;
        const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await Users.findOne({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now(),
            }
        });
        if (!user) {
            return next(new ErrorHandler("Token is invalid or has been expired", 401));
        }
        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        })
    }
);

// Admin Controllers
export const getAllUsers = catchAsyncError(
    async (req, res, next) => {
        const role = req.query.role || "";
        const name = req.query.name || "";
        const users = await Users.find(
            {
                role: {
                    $regex: new RegExp(role, "i"),
                },
                name: {
                    $regex: new RegExp(name, "i"),
                },
            }
        );
        res.status(200).json({
            success: true,
            users,
        })
    }
);

export const updateUserRole = catchAsyncError(
    async (req, res, next) => {
        const { role } = req.body;
        const user = await Users.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler("User Not Found", 404));
        }
        if (user._id.toString() === req.user._id.toString()) {
            return next(new ErrorHandler("Can't change own role", 403));
        }
        if (!["user", "writer", "admin"].includes(role.toLowerCase())) {
            return next(new ErrorHandler("Invalid Role", 400));
        }
        user.role = role.toLowerCase(); 
        await user.save();

        res.status(200).json({
            success: true,
            message: `Role Updated to ${user.role}`,
        });
    }
);

export const deleteUser = catchAsyncError(
    async (req, res, next) => {
        const user = await Users.findById(req.params.id);
        if (!user) return next(new ErrorHandler("User Not Found", 404));
        if (user._id.toString() === req.user.id.toString()) return next(new ErrorHandler("Can't delete yoursalf. If you are admin", 403));

        // Cancel subscription

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        await Users.deleteOne(user._id);
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        })
    }
);
