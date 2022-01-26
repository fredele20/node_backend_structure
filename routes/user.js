const express = require("express")
const _ = require("lodash")
const { getUserByEmail, createUser, getUserByPhone } = require("../database/user")
const { ErrUserWithEmailAlreadyExist, ErrUserWithPhoneAlreadyExist, ErrUserLogInFailed } = require("../utils/errors")
const { passwordHash, generateAuthToken, matchPassword, validateUser, validateLogin } = require("../utils/utils")
const upload = require("../utils/multer")
const cloudinary = require("../utils/cloudinary")
const router = express.Router()

// @Route: /register, to register new user
router.post("/register", upload.single("image"), async(req, res) => {
    // Validation of request body
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(jsonResponse = {message: error.details[0].message})

    // Check if user with the given email is already existing in the database
    let user = await getUserByEmail({email: req.body.email})
    if (user) return res.status(400).send(jsonResponse = {message: ErrUserWithEmailAlreadyExist})

    // Check if user with the given phone number is already existing in the database
    user = await getUserByPhone({phone: req.body.phone})
    if (user) return res.status(400).send(jsonResponse = {message: ErrUserWithPhoneAlreadyExist})
    
    // Hash user password before creating the new user
    req.body.password = await passwordHash(req.body.password)
    // user = await createUser(_.pick(req.body))

    const result = await cloudinary.uploader.upload(req.file.path)
    //let url = await upload(req.body.imageURL) //TODO: expected to call the function that uploads to cloudinary here
    user = await createUser(_.extend(req.body, {imageURL: result.secure_url}))

    // Save the user in the database
    user = await user.save()

    // Generate user token upon successful registration
    const token = generateAuthToken(user._id, user.email)

    // Send user details to the client
    res.status(201).send(
        jsonResponse = {
            message: "User Created successfully",
            data: _.pick(user, ['_id', 'email', 'imageURL']),
            token: token
        }
    )
})

// @Route: login, to login a user
router.post("/login", async(req, res) => {
    // Validation of login request body
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).send(jsonResponse = {message: error.details[0].message});

    // Check if the email provided is valid
    let user = await getUserByEmail({email: req.body.email})
    if (!user) return res.status(400).send(jsonResponse = {message: ErrUserLogInFailed})

    // Check if the password match with email of the user provided
    // Check if the given password matched the hashed password
    const validPassword = await matchPassword(user.password, req.body.password)
    if (!validPassword) return res.status(400).send(jsonResponse = { message: ErrUserLogInFailed })

    // Generated authentication token upon correct credentials
    const token = generateAuthToken(user._id, user.email)

    // Send user details to the client
    res.status(200).send(jsonResponse = {
        message: "Logged in successful",
        data: _.pick(user, ["_id", 'email', "firstname"]),
        token: token
    })
})

module.exports = router