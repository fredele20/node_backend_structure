const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")
const { userSchema } = require("../model/user")


async function passwordHash(password) {
  const salt =  await bcrypt.genSalt(10)
  let hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

async function matchedPassword(enteredPassword) {
  const password = userSchema.password
  return await bcrypt.compare(enteredPassword, password)
}

function generateAuthToken() {
  const token = jwt.sign(
    {_id: userSchema._id},
    config.get('jwtPrivateKey')
  )
  return token
}

module.exports.passwordHash = passwordHash
module.exports.generateAuthToken = generateAuthToken
module.exports.matchedPassword = matchedPassword