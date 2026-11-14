import { Request, Response, NextFunction } from "express";

export const catchAsyncError = (passedFunction: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, resp: Response, next: NextFunction) => {
    Promise.resolve(passedFunction(req, resp, next)).catch(next)
}