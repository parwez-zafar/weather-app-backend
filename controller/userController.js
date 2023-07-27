const ErrorHandler = require('../utils/ErrorHandlers');
const catchAsyncError = require('../middleware/catchAsyncError');

const User = require('../model/userModel');
const sendToken = require('../utils/jwtToken');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, confirm_password, fav_city } = req.body;
    // console.log(email);
    // consoe.log(req.body);

    if (password !== confirm_password) {
        return next(new ErrorHandler("Password Does not match", 400));
    }
    const user = await User.create({
        name, email, password, confirm_password, fav_city
    })
    sendToken(user, 201, res)
})



// User Login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if email and password given or not
    if (!email || !password) {
        return next(new ErrorHandler("Plese Enter Email and Password.", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    // console.log(user);
    if (!user) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    const isCorrectPassword = await user.comparePassword(password);
    if (!isCorrectPassword) {
        return next(new ErrorHandler("Invalid Email Or Password", 401));
    }

    sendToken(user, 201, res);
})


// user Logout
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
})

// Get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    // console.log(req.user.id);
    res.status(200).json({
        success: true,
        user,
    })
})
