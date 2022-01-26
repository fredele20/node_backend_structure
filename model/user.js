const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "please add your firstname"],
        minlength: 3,
        maxlength: 255
    },

    lastname: {
        type: String,
        required: [true, "please add your lastname"],
        minlength: 3,
        maxlength: 255
    },

    phone: {
        type: String,
        required: [true, "please add your phone number"],
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },

    password: {
        type: String,
        required: true,
        minlength: 5
    },

    imageURL: {
      type: String
    },

    isAmin: {
      type: Boolean,
      default: false
    }
})


const User = mongoose.model('User', userSchema)


exports.User = User;