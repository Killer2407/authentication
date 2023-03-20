const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        console.log('Authorized token')
        const token = req.headers.authorization.split(" ")[1];

        const decodeToken = await jwt.verify(token, process.env.JWT);

        res.user = decodeToken
        next();

    } catch(err) {
        console.log('Error from auth')
        // console.log(err);
        next(err);
    }
}

const localVariables =  (req, res, next) => {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}


module.exports = { auth, localVariables };
