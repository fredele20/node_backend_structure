const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")
const Joi = require("joi")

// User inputs validations using Joi.
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

// User login credentials validation using Joi.
function validateLogin(login) {
  const schema = {
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  }
  return Joi.validate(login, schema)
}


// Password hash function for user registration using bcrypt
async function passwordHash(password) {
  const salt =  await bcrypt.genSalt(10)
  let hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

// Password comparison function for user login
async function matchPassword(enteredPassword, existingPassword) {
  return await bcrypt.compare(existingPassword, enteredPassword)
}

// Authentication token generation.
function generateAuthToken(id, email) {
  const token = jwt.sign(
    {
      id: id,
      email: email
    },
    config.get('jwtPrivateKey')
  )
  return token
}

// JSON response structure type.
let jsonResponse = {
  message: "",
  data: {},
  token: ""

}

async function download(filePath, fileName) {}

module.exports.passwordHash = passwordHash
module.exports.generateAuthToken = generateAuthToken
module.exports.matchPassword = matchPassword
module.exports.jsonResponse = jsonResponse
module.exports.validateUser = validateUser
module.exports.validateLogin = validateLogin