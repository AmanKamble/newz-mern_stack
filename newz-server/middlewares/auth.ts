import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Users } from "../models/Users.js";
import { Request, Response, NextFunction } from "express";

export const isAuthenticated = catchAsyncError(
    async (req: any, res: Response, next: NextFunction) => {
        const { token } = req.cookies;
        if (!token) return next(new ErrorHandler("Not Logged In", 401));
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = await Users.findById(decoded._id);
        next();
    }
)

export const authorizedWriter = (req: any, resp: Response, next: NextFunction) => {
    if (req.user.role === "admin" || req.user.role === "writer") {
        next();
    } else {
        return next(
            new ErrorHandler(`User with role '${req.user.role}' is not allowed to access this resource.`, 403)
        );
    }
}

export const authorizedAdmin = (req: any, resp: Response, next: NextFunction) => {
    if (req.user.role !== "admin") {
        return next(
            new ErrorHandler(`${req.user.role} is not allowed to access this resource.`, 403)
        )
    };
    next();
}