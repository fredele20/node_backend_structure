const mongoose = require("mongoose")
const Joi = require("joi")
const config = require("config")
const jwt = require("jsonwebtoken")

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
    }
})


function validateUser(user) {
    const schema = {
      firstname: Joi.string().min(3).required(),
      lastname: Joi.string().min(3).required(),
      email: Joi.string().min(5).required().email(),
      phone: Joi.string().required(),
      password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(user, schema)
}

function validateLogin(login) {
  const schema = {
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  }
  return Joi.validate(login, schema)
}

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      { _id: this._id },
      config.get('jwtPrivateKey')
    )
    return token
}

// function generateAuthToken() {
//     const token = jwt.sign(
//       {_id: userSchema._id},
//       config.get('jwtPrivateKey')
//     )
//     return token
//   }


const User = mongoose.model('User', userSchema)


exports.User = User;
exports.validate = validateUser
exports.validateLogin = validateLogin
exports.userSchema = userSchema