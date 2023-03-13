
const bcrypt = require('bcrypt');
const User = require('../user.model');

const register = async (req, res, next) => {
    try {
        console.log("Hello from try block")
        const { username, password, profile, email } = req.body;

        const existUser = await User.findOne({ username }, function(err, user) {
                if(err) {
                    reject(new Error(err));
                }
                if(user) {
                    reject({error: "Please use Unique Username"})

                    resolve();
                }
            });
            const existEmail = new Promise((resolve, reject) => {
                User.findOne({email}, function(err, email) {
                    if(err) {
                        reject(new Error(err));
                    }
                    if(email) {
                        reject({error: "Please use Unique Email"})
    
                        resolve();
                    }
                })
            });

            Promise.all([existUser, existEmail])
                .then(() => {
                    if(password) {
                        bcrypt.hash(password, 20)
                        .then(hashedPassword => {
                            const user = new User({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            })

                            user.save()
                                .then(result => res.status(200).send({ msg: "User is Registered Successfully"}))
                                .catch(error => res.status(500).send({error}));
                        }) .catch(error => {
                            return res.status(500).send({
                                error: "Enable to hashed password"
                            })
                        })
                    }
                }) .catch(error => {
                    return res.status(500).send({error})
                })

    } catch(error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    res.json("Route is Login")
}

const getUser = async (req, res, next) => {
    res.json("Route is getUser")
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

module.exports = {register, login, getUser, updateUser, generateOTP, verifyOTP, createReset, resetPassword};
