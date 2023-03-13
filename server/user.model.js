const mongoose = require ("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide unique Password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide unique Email"],
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
    }
})


const User = mongoose.model("User", userSchema);
module.exports = User;
 