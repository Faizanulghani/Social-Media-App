const express = require('express')
const { createPost, likeAndUnlikePost, deletePost } = require('../controllers/post')
const { isAuthenticated } = require('../middleware/isAuthenticated')

let router = express.Router()

router.route("/post/upload").post(isAuthenticated,createPost)
router.route("/post/:id").get(isAuthenticated,likeAndUnlikePost).delete(isAuthenticated,deletePost)

module.exports = router