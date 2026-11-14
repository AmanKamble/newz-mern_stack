export const sendToken = (res: any, user: any, message: string, statusCode: number = 200) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'none' as const,
    };

    delete user._doc.password;

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        user
    });
};