const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true,"please add the user name"]
    },
    email: {
        type: String,
        required: [true,"please add the user email address"],
        unique: [true,"email address already taken"]
    },
    password: {
        type: String,
        required: [true,"please add the user password"]
    }
},{
    timestamps: true
})

module.exports = mongoose.model("User",UserSchema);