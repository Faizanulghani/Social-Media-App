const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  updateCaption,
} = require("../controllers/post");
const { isAuthenticated } = require("../middleware/isAuthenticated");

let router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

module.exports = router;
