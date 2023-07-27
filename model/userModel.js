const mongoose = require('mongoose');
const validator = require('validator');
const JWT = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLenght: [13, "Name Cannot Exceed 30 charecters"],
        minLength: [4, "Name Should Have More Than 4 Charecters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter A Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Passowrd"],
        minLength: [8, "Password Shluld Be Grater Than 8 Charecters"],
        select: false,
    },
    confirm_password: {
        type: String,
        required: [true, "Please Enter Your Passowrd"],
        minLength: [8, "Password Shluld Be Grater Than 8 Charecters"],
        select: false,
    },
    fav_city: {
        type: Array,
    }
})


// password Hashing
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // console.log("bcrypt");
        this.password = await bcrypt.hash(this.password, 12);
        this.confirm_password = await bcrypt.hash(this.confirm_password, 12);
    }
    next();
})

// JWT token
userSchema.methods.getJWTToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// compare password
userSchema.methods.comparePassword = async function (loginPassword) {
    return await bcrypt.compare(loginPassword, this.password);
}


module.exports = mongoose.model("User", userSchema);