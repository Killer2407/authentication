
const bcrypt = require('bcrypt');
const User = require('../user.model');
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator")

const verifyUser = async (req, res, next) => {

    try {
        console.log('Verifying user');
        const { username } = req.method === 'GET' ? req.query : req.body;

        let exist = await User.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Cannot find User" })
        next();


    } catch (err) {
        console.log("Error from Verifying User")
        console.log(err);
        next(err);
    }
}

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
        res.status(200).json({message: "User is registered"})

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

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT, { expiresIn: "24h" })

        return res.status(200).send({
            msg: "Login Successful!",
            username: user.username,
            token
        })

    } catch (err) {
        console.log('error', err)
        next(err)
    }
}

const getAllUser = async (req, res, next) => {
    try {
        console.log('Hit from getting all User')
        const users = await User.find()
        res.status(200).json(users);
    } catch (err) {
        console.log("Gettingall user error")
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        console.log('getUser hit')
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        console.log("getUser error")
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        console.log('updateUser hit')
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser);
    } catch (err) {
        console.log("updateUser error")
        next(err)
    }
}

//getRequest and generates OTP
const generateOTP = async (req, res, next) => {
    // can pass an object as a second argument , 
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(200).send({ code: req.app.locals.OTP })
}

const verifyOTP = async (req, res, next) => {
    const {code} = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null; //OTP generate
        req.app.locals.resetSession = true; //set session for resetPassword
        return res.status(201).send({msg: "Successfully Verified!!!"})
    }
    return res.status(400).send({ error: "Invalid OTP"})
}

const createReset = async (req, res, next) => {
   if(req.app.locals.resetSession) {
    //give access once
    req.app.locals.resetSession = false;
    return res.status(201).send({msg: "Session Access Granted!!!"})
   }
   return res.status(400).send({ error: "Session Expired"})
}


//put request
const resetPassword = async (req, res, next) => {
    try{
       const resetUser = await User.findOne({ username: req.body.username });

       if(!resetUser) throw new Error("User does not exist");
       let key = await token.findOne({id: resetUser._id });
       if(key) await token.deleteOne();

       const hash = await bcrypt.hash(Number(bcryptSalt));

       await new key({
        id: resetUser._id,
        token: hash,
        createdAt: Date.now(),
       }).save()

    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message : "Internal server error"
        })
    }
}

module.exports = { register, login, getUser, getAllUser, updateUser, generateOTP, verifyOTP, createReset, resetPassword, verifyUser };
