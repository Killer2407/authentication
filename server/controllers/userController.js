
const bcrypt = require('bcrypt');
const User = require('../user.model');
const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//         return next(createError(401, "You are not Authenticated"));
//     }

//     jwt.verify(token, process.env.JWT, (err, user) => {
//         if (err)
//             return next(createError(403, "Token is not valid"));
//         req.user = user
//         next()
//     })
// }


// const verifyUser = async (req, res, next) => {

//     try {
//         console.log('Verifying user');
//         const { username } = req.method === 'GET' ? req.query : req.body;

//         let exist = await User.findOne({ username });
//         if (!exist) return res.status(404).send({ error: "Cannot find User" })
//         next();


//     } catch (err) {
//         console.log("Error from Verifying User")
//         console.log(err);
//         next(err);
//     }
// }

const register = async (req, res, next) => {
    try {
        console.log("hit");
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            address: req.body.address,
            profile: ""
        })

        await newUser.save();
        res.status(200).json("User is registered")

    } catch (err) {
        console.log('Error from registering')
        console.log(err);
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        console.log("Hi from Login");
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(400, "Email or Password not match!"))

        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ ...otherDetails })

    } catch (err) {
        console.log('error', err)
        next(err)
    }
}

const getAllUser = async (req, res, next) => {
}

const updateUser = async (req, res, next) => {
    res.json("Route is updateUser")
}

//getRequest and generates OTP
const generateOTP = async (req, res, next) => {
    res.json("Route is generatingOTP")
}

const verifyOTP = async (req, res, next) => {
    res.json("Route is verifyingOTP")
}

const createReset = async (req, res, next) => {
    res.json("Route is generatingOTP")
}


//put request
const resetPassword = async (req, res, next) => {
    res.json("Route is resetPassword")
}

module.exports = {register, login, getAllUser, updateUser, generateOTP, verifyOTP, createReset, resetPassword };
