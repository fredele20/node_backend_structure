const express = require("express")
const { validate, validateLogin } = require("../model/user")
const _ = require("lodash")
const { getUserByEmail, createUser, getUserByPhone } = require("../database/user")
const { ErrUserWithEmailAlreadyExist, ErrUserWithPhoneAlreadyExist } = require("../utils/errors")
const { passwordHash, generateAuthToken, matchPassword } = require("../utils/utils")
const router = express.Router()

router.post("/register", async(req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(jsonResponse = {message: error.details[0].message})

    let user = await getUserByEmail({email: req.body.email})
    if (user) return res.status(400).send(jsonResponse = {message: ErrUserWithEmailAlreadyExist})

    user = await getUserByPhone({phone: req.body.phone})
    if (user) return res.status(400).send(jsonResponse = {message: ErrUserWithPhoneAlreadyExist})
    
    req.body.password = await passwordHash(req.body.password)
    user = await createUser(_.pick(req.body, ['firstname', 'lastname', 'email', 'phone', 'password']))

    user = await user.save()

    const token = user.generateAuthToken()

    res.status(201).send(
        jsonResponse = {
            message: "User Created successfully",
            data: _.pick(user, ['_id', 'email']),
            token: token
        }
    )
})

router.post("/login", async(req, res) => {
    const { error } = validateLogin(req.body)
    if (error) return res.status(400).send(jsonResponse = {message: error.details[0].message});

    let user = await getUserByEmail({email: req.body.email})
    if (!user) return res.status(400).send(jsonResponse = {message: "Invalid Email or Password"})

    const validPassword = await matchPassword(user.password, req.body.password)
    if (!validPassword) res.status(400).json({ message: "Invalid email or password" })

    const token = generateAuthToken(user._id, user.email)

    res.status(200).send(jsonResponse = {
        message: "Logged in successful",
        data: _.pick(user, ["_id", 'email', "firstname"]),
        token: token
    })
})

module.exports = router