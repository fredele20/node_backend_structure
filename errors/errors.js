let ErrUserWithPhoneAlreadyExist = "A user with the phone number already exist"
let ErrUserWithEmailAlreadyExist = "A user with the email number already exist"
let ErrUserWithUsernameAlreadyExist = "A user with the username number already exist"
let ErrNoUserWithEmail = "No user with the given email"
let ErrNoUserWithPhone = "No user with the given phone number"
let ErrNoUserWithUsername = "No user with the given username"


let jsonResponse = {
  message: "",
  data: {},
  token: ""

}


module.exports.ErrUserWithEmailAlreadyExist = ErrUserWithEmailAlreadyExist
module.exports.ErrUserWithPhoneAlreadyExist = ErrUserWithPhoneAlreadyExist
module.exports.jsonResponse = jsonResponse



