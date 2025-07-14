const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  updateCaption,
  addComment,
  deleteComment,
  getPostsOfFollowing,
} = require("../controllers/post");
const { isAuthenticated } = require("../middleware/isAuthenticated");

let router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route("/my/posts").get(isAuthenticated, getPostsOfFollowing);
router
  .route("/post/comment/:id")
  .put(isAuthenticated, addComment)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
