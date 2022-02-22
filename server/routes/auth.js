const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const veryfyToken = require('../midleware/auth')
// @route GET api/auth
// @desc check user
// @access public
router.get('/', veryfyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user)
            return res.status(400).json({success: false, message: 'user not Found'})
        res.json({success: true, user})
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server'})
    }
})

// @route Post api/auth/register
// @desc register user
// @access public
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    // Simple validation
    if (!username || !password)
    return res.status(400).json({success: false, message: "Missing username or password"})

    try {
        // check existing user
        const user = await User.findOne({ username })
        if (user)
        return res.status(400).json({success: false, message: "Username already taken"})

        // All ok
        const hashPassword = await argon2.hash(password)
        const newUser = new User({
            username,
            password: hashPassword
        })
        await newUser.save()

        //return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.json({success: true, message: "dang ky thanh cong", accessToken})
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server'})
    } 
})

// @route Post api/auth/login
// @desc login user
// @access public
router.post('/login', async (req, res) => {
    const {username, password} = req.body
    if (!username || !password)
    return res.status(400).json({success: false, message: 'Missing username or password'})
    
    try {
        //check for existing user
        const user = await User.findOne({username})
        if (!user)
        return res.status(400).json({success: false, message: 'Username not found'})

        //Username Found
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
        return res.status(400).json({success: false, message: 'Password not found'})
        //allgood
        const accessToken = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET)
        return res.json({success: true, message: "login thanh cong", accessToken})
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server'})
    }
})

module.exports = router