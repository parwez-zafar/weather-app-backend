const ErrorHandler = require('../utils/ErrorHandlers');
const catchAsyncError = require("./catchAsyncError");
const JWT = require("jsonwebtoken");
const User = require('../model/userModel');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);

    if (!token)
        return next(new ErrorHandler("Please Login to access this resource", 401));

    const decodedData = JWT.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    req.user = await User.findById(decodedData.id);
    next();
})
