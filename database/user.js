const { User } = require("../model/user")

async function getUserByField(field, value) {
    let user = await User.findOne({ field: value })
}

async function getUserByEmail(email) {
    let user = await User.findOne(email)
    return user
}
async function getUserByPhone(phone) {
    let user = await User.findOne(phone)
    return user
}

async function createUser(...data) {
    let user = await User.create(...data)
    return user
}

module.exports.getUserByEmail = getUserByEmail
module.exports.getUserByPhone = getUserByPhone
module.exports.createUser = createUser