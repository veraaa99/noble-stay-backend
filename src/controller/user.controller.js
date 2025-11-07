import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../token/webTokenGenerating.js'

export const registerUser = asyncHandler(async (req, res) => {
    const { email, phone, password, repeatedPassword } = req.body

    if(!email || !phone || !password || !repeatedPassword) {
        return res.status(400).json({ message: 'Please enter an email address, a phone number, a password and repeat the password to register a new user'})
    }

    if(repeatedPassword !== password) {
        return res.status(400).json({ message: 'Passwords do not match'})
    }

    const trimmedEmail = email.toLowerCase().trim().replace(/\s/g, "")
    const existingUser = await User.findOne({ email: trimmedEmail })

    if(existingUser) {
        return res.status(401).json({ message: 'A user with this email address already exists' })
    }

    const salt = await bcrypt.genSalt(15)
    const newHashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ email: email, phone: phone, password: newHashedPassword })

    const userToken = generateToken(user)

    res.status(201).json({_id: user._id, email: trimmedEmail, phone: phone, userToken: userToken })
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: 'Please enter an email address and a password to login' })
    }

    const trimmedEmail = email.toLowerCase().trim().replace(/\s/g, "")
    const user = await User.findOne({ email: trimmedEmail }).exec()

    if(!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const userToken = generateToken(user)

    res.status(200).json({_id: user._id, email: user.email, userToken: userToken })
})

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").exec()

    if(!users || users.length == 0) {
        return res.status(404).json({ message: 'No users found' })
    }

    // Return a status 200 and the users
    res.status(200).json(users)
})

export const getUserByID = asyncHandler(async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Id is invalid' })
    } 

    const user = await User.findById(id).select("-password").exec()

    if (!user) {
        return res.status(404).json({ message: 'User could not be found' })
    }

    res.status(200).json(user)
})

export const getUserByToken = asyncHandler(async (req, res) => {

    if(!req.user || req.user == undefined) {
        return res.status(400).json({ message: "No id found"})
    }

    if(!mongoose.Types.ObjectId.isValid(req.user._id)) {
        return res.status(400).json({ message: "Id is invalid"})
    }

    const user = await User.findById(req.user._id, "-password").exec()

    if(!user) {
        return res.status(404).json({ message: 'User could not be found' })
    }

    res.status(200).json(user)
})

export const checkToken = asyncHandler(async (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        name: req.user.email
    })
})