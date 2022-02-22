const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Post = require('../models/Post')
const verifyToken = require('../midleware/auth')


// @route GET api/auth/posts
// @desc Get posts
// @access private

router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username'])
        return res.json({success: true, post: posts})
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server'})
    }
})




// @route Post api/auth/posts
// @desc user's post
// @access private
router.post('/', verifyToken, async(req, res) => {
    const{title, description, url, status} = req.body
    //Simple Validation Tittle
    if (!title)
    return res.status(400).json({success: false, message: "your's post not title"})
    
    try {
        const newPost = new Post({
            title, 
            description, 
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()
        return res.json({success: true, message: "Happy Learning", post: newPost})
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server'})
    }
})

// @route PUT api/auth/posts
// @desc Put update post
// @access private

router.put('/:id', verifyToken, async(req, res) => {
    const { title, description, url, status } = req.body
    //check require title
    if (!title)
    return res.status(400).json({success: false, message: "your's post not title"})

    try {
        let postUpdate = {
            title,
            description: description || '',
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN'    
        }
        const postUpdateCondition = {_id: req.params.id, user: req.userId}
        postUpdate = await Post.findOneAndUpdate(postUpdateCondition, postUpdate, {new: true})

        if (!postUpdate)
        return res.status(401).json({success: false, message: 'post not found'})

        //all good
        res.json({success: true, message: 'Updated post successfully', post: postUpdate})

    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server'})
    }
})

// @route Delete api/auth/posts
// @desc Delete post
// @access private

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletePost = await Post.findOneAndDelete(postDeleteCondition)

        if (!deletePost)
        return res.status(401).json({success: false, message: 'post not found'})
        
        //all good
        res.json({success: true, message: 'remove thanh cong'})
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server'})
    }
})





module.exports = router