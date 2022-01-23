const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")


async function passwordHash(password) {
  const salt =  await bcrypt.genSalt(10)
  let hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

async function matchPassword(enteredPassword, existingPassword) {
  return await bcrypt.compare(existingPassword, enteredPassword)
}

// TODO: I should come back to this
function generateAuthToken(...data) {
  const token = jwt.sign(
    {data: data},
    config.get('jwtPrivateKey')
  )
  return token
}

let jsonResponse = {
  message: "",
  data: {},
  token: ""

}

module.exports.passwordHash = passwordHash
module.exports.generateAuthToken = generateAuthToken
module.exports.matchPassword = matchPassword
module.exports.jsonResponse = jsonResponse