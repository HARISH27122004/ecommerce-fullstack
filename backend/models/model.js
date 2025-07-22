const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'enter your name!']
    },
    email: {
        type: String,
        required: [true, 'enter your email!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'enter your password!']
    },
    role: {
        type: String,
        enum: ["Customer", "Admin"],
        default: "Customer"
    }
},
    {
        timestamps: true,
    }
)

const users = mongoose.model("Users", userSchema);
module.exports = { users }