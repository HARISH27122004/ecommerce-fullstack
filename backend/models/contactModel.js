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
    feedback:{
        type:String,
    }
},
    {
        timestamps: true,
    }
)

const contact = mongoose.model("Contacts", userSchema);
module.exports = { contact }